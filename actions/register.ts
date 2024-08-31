"use server";
import prisma from "@/lib/db";
import { registerSchema } from "@/validations/authValidations";
import { z } from "zod";
import bcryptjs from "bcryptjs";
import { Role } from "@prisma/client";

type UserData = z.infer<typeof registerSchema>;

export const registerAction = async (userData: UserData) => {
  const { data, error, success } = await registerSchema.safeParseAsync(
    userData
  );

  if (!success) {
    return {
      success:false,
      error: error.issues.map((issue) => {
        return {
          path: issue.path[0],
          message: issue.message,
        };
      }),
    };
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (user) {
      return {
        success:false,
        message: "User already exists!",
      };
    }
  } catch (error) {
    console.error("error while verifying user data!");
    return {
      success:false,
      message: "Something went wrong!",
    };
  }

  const hashedPass = await bcryptjs.hash(data.password, 10);

  let newUser;

  try {
    await prisma.$transaction(async (tx) => {
      newUser = await tx.user.create({
        data: {
          email: data.email,
          name: `${data.firstName} ${data.lastName}`,
          password: hashedPass,
          role: data.role as Role,
        },
        select: {
          email: true,
          id: true,
          name: true,
          role: true,
          updatedAt: true,
        },
      });

      await tx.account.create({
        data: {
          userId: newUser.id,
          type: "credentials",
          provider: "credentials",
          providerAccountId: newUser.id,
        },
      });
    });

    return {
      success:true,
      message: "User created successfully!",
      user: newUser,
    };
  } catch (error) {
    console.error("Error while creating user", error);
    return {
      success:false,
      message: "Error while creating user!",
    };
  }
};
