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
        message: "User already exists!",
      };
    }
  } catch (error) {
    console.error("error while verifying user data!");
  }

  const hashedPass = await bcryptjs.hash(data.password, 10);

  try {
    const newUser = await prisma.user.create({
      data: {
        email: data.email,
        name: `${data.firstName} ${data.lastName}`,
        password: hashedPass,
        role: data.role as Role,
      },
      select: {
        id: true,
        email: true,
        role: true,
        name: true,
        createdAt: true,
      },
    });

    return {
      message: "User created successfully!",
      user: newUser,
    };
  } catch (error) {
    console.error("Error while creating user", error);
    return {
      message: "Error while creating user!",
    };
  }
};
