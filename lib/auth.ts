import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { CredentialsSignin, User } from "next-auth";
import prisma from "./db";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginSchema } from "@/validations/authValidations";
import bcryptjs from "bcryptjs";
import { Prisma, Role } from "@prisma/client";
import { ZodError } from "zod";
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
      role?: Role | null;
    } & DefaultSession["user"];
  }

  interface User {
    role?: Role | null;
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser extends User {
    role?: Role | null;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth(() => {
  const adapter = PrismaAdapter(prisma);
  return {
    providers: [
      Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
      Github({
        clientId: process.env.AUTH_GITHUB_ID,
        clientSecret: process.env.AUTH_GITHUB_SECRET,
      }),
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
      async signIn({ account, profile, user, email }) {

        if(account?.provider === "credentials") return true;

        if (!account || !profile) {
          return false; // Explicitly return a boolean value
        }

        const existingUser = await prisma.user.findUnique({
          where: { email: profile.email ?? "" },
          include: { accounts: true },
        });

        if (existingUser) {
          const isLinked = existingUser.accounts.some(
            (acc) => acc.provider === account.provider
          );

          if (!isLinked) {
            await prisma.account.create({
              data: {
                userId: existingUser.id,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                type: account.type,
                access_token: account.access_token,
                token_type: account.token_type,
                id_token: account.id_token,
                scope: account.scope,
                expires_at: account.expires_at,
                refresh_token: account.refresh_token,
              },
            });

            user.id = existingUser.id;
          }
        } else {
          await prisma.$transaction(async (tx) => {
            const newUser = await tx.user.create({
              data: {
                id:
                  (account.provider === "github" ? profile.id : profile.sub) ??
                  "",
                name: profile?.name ?? "",
                email: profile.email ?? "",
                role: Role.User,
                emailVerified: new Date(),
                image:
                  account.provider === "github"
                    ? profile.avatar_url
                    : profile.picture,
              },
            });

            await tx.account.create({
              data: {
                userId: newUser.id,
                type: account.type,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                access_token: account.access_token,
                token_type: account.token_type,
                id_token: account.id_token,
                scope: account.scope,
                expires_at: account.expires_at,
              },
            });
          });
        }

        return true; // Explicitly return true if everything is valid
      },
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
    pages: {
      error: "/login",
      signIn: "/login",
      newUser: "/",
    },
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
