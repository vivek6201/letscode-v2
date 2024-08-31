"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { addTutorialValidations } from "@/validations/tutorialValidations";
import { z } from "zod";

type Tutorialtype = z.infer<typeof addTutorialValidations>;

const createTutorial = async (tutorialData: Tutorialtype) => {
  const { success, data, error } = await addTutorialValidations.safeParseAsync(
    tutorialData
  );

  if (!success) {
    return {
      success: false,
      error: error.issues.map((issue) => {
        return {
          path: issue.path[0],
          message: issue.message,
        };
      }),
    };
  }

  const session = await auth();

  if (session?.user.role !== "Admin")
    return {
      success: false,
      message: "You are not authorized!",
    };

  try {
    const tutorial = await prisma.tutorials.findFirst({
      where: {
        slug: data.slug,
      },
    });

    if (tutorial) {
      return {
        success: false,
        message: "Tutorial Already exists with this slug",
      };
    }
  } catch (error) {
    console.error("error while verifying tutorial", error);
    return {
      success: false,
      message: "Error while verifying tutorial",
    };
  }

  try {
    const newTutorial = await prisma.tutorials.create({
      data: {
        title: data.tutorialName,
        slug: data.slug,
        description: data.description,
      },
    });

    return {
      success: true,
      message: "tutorial created successfully!",
      tutorial: newTutorial,
    };
  } catch (error) {
    console.error("error while creating tutorial", error);
    return {
      success: false,
      message: "Error while creating tutorial",
    };
  }
};

export const updateTutorial = async (tutorialData: Tutorialtype) => {
  const { data, success, error } = await addTutorialValidations
    .partial()
    .safeParseAsync(tutorialData);

  const session = await auth();

  if (session?.user.role !== "Admin")
    return {
      success: false,
      message: "You are not authorized!",
    };

  if (!success) {
    return {
      success: false,
      error: error.issues.map((issue) => {
        return {
          path: issue.path[0],
          message: issue.message,
        };
      }),
    };
  }

  try {
    const tutorial = await prisma.tutorials.findFirst({
      where: {
        slug: data.slug,
      },
    });

    if (!tutorial) {
      return {
        success: false,
        message: "Tutorial not found!",
      };
    }
  } catch (error) {
    console.error("error", error);
    return {
      success: false,
      message: "Error occurred while verifying tutorial",
    };
  }

  try {
    const updateTutorial = await prisma.tutorials.update({
      where: {
        slug: data.slug,
      },
      data: data,
    });

    return {
      success: true,
      message: "Data updated successfuly!",
      tutorial: updateTutorial,
    };
  } catch (error) {
    console.error("error", error);
    return {
      success: false,
      message: "Errow occurred while updating data!",
    };
  }
};

export default createTutorial;
