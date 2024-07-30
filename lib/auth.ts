import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { CredentialsSignin, User } from "next-auth";
import prisma from "./db";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginSchema } from "@/validations/authValidations";
import bcryptjs from "bcryptjs";
import { Prisma } from "@prisma/client";
import { ZodError, any } from "zod";
import { randomUUID } from "crypto";
import { JWT, JWTEncodeParams, encode } from "next-auth/jwt";
class InvalidLoginError extends CredentialsSignin {
  constructor(code: string) {
    super();
    this.code = code;
    this.message = code;
  }
}

declare module "@auth/core/types" {
  interface Session {
    user: {
      role?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    role?: string | null;
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser extends User {
    role?: string | null;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth(() => {
    const adapter = PrismaAdapter(prisma);
    return {
      providers: [
        Google,
        Github,
        CredentialsProvider({
          name: "Lets Code",
          credentials: {
            email: { label: "email", type: "text" },
            password: { label: "Password", type: "password" },
          },
  
          async authorize(credentials) {
            try {
              const result = await loginSchema.parseAsync(credentials);
              const { email, password } = result;
  
              const user = await prisma.user.findUnique({
                where: {
                  email,
                },
                include: {
                  accounts: true,
                },
              });
  
              if (!user) {
                throw new InvalidLoginError("User account does not exist");
              }
  
              if (user.accounts[0].provider !== "credentials") {
                throw new InvalidLoginError(
                  `Please sign in with ${user.accounts[0].provider}`
                );
              }
  
              const passwordsMatch = await bcryptjs.compare(
                password,
                user?.password!
              );
  
              if (!passwordsMatch) {
                throw new InvalidLoginError("Password is not correct");
              }
  
              return user;
            } catch (error) {
              if (
                error instanceof Prisma?.PrismaClientInitializationError ||
                error instanceof Prisma?.PrismaClientKnownRequestError
              ) {
                throw new InvalidLoginError(
                  "System error. Please contact support"
                );
              }
  
              if (error instanceof ZodError) {
                throw new InvalidLoginError(error.errors[0].message);
              }
  
              throw error;
            }
          },
        }),
      ],
      callbacks: {
        async session({ session, user }) {
          session.user = {
            email: user.email,
            emailVerified: user.emailVerified,
            id: user.id,
            role: user.role,
            name: user.name,
            image: user.image,
          };
          return session;
        },
        async jwt({ token, user, account }) {
          if (account?.provider === "credentials") {
            const expires = new Date(Date.now() + 60 * 60 * 24 * 30 * 1000);
            const sessionToken = randomUUID();
  
            const session = await adapter.createSession!({
              userId: user.id as string,
              sessionToken,
              expires,
            });
  
            token.sessionId = session.sessionToken;
          }
  
          return token;
        },
      },
      jwt: {
        maxAge: 60 * 60 * 24 * 30,
        async encode(arg: JWTEncodeParams<JWT>) {
          return (arg.token?.sessionId as string) ?? encode(arg);
        },
      },
      adapter,
      // pages: {
      //   error: "/login",
      //   signIn: "/login",
      //   newUser: "/",
      // },
      // debug: process.env.NODE_ENV === "development",
      trustHost: true,
      events: {
        async signOut(message) {
          if ("session" in message && message.session?.sessionToken) {
            await prisma.session.deleteMany({
              where: {
                sessionToken: message.session?.sessionToken,
              },
            });
          }
        },
      },
    };
  });
