"use server";

import prisma from "@/lib/db";
import { addChapterValidations } from "@/validations/tutorialValidations";
import { z } from "zod";

type ChapterType = z.infer<typeof addChapterValidations>;

const createChapter = async (
  chapterData: ChapterType,
  tutorialSlug: string
) => {
  const { data, success, error } = await addChapterValidations.safeParseAsync(
    chapterData
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

  let tutorial = null;

  try {
    tutorial = await prisma.tutorials.findUnique({
      where: {
        slug: tutorialSlug,
      },
    });

    if (!tutorial) {
      return {
        success: false,
        error: "Tutorial Not found!",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Failed to verify data",
    };
  }

  try {
    await prisma.chapter.create({
      data: {
        tutorialsId: tutorial.id,
        chapterName: data.chapterName,
        sortingOrder: data.chapterNo,
      },
    });

    return {
      success: true,
      message: "Chapter created Successfully",
    };
  } catch (error) {
    console.error("error", error);
    return {
      success: false,
      error: "Failed to created chapter",
    };
  }
};

export const updateChapter = async (
  chapterData: ChapterType,
  chapterId: string
) => {
  const { data, error, success } = await addChapterValidations
    .partial()
    .safeParseAsync(chapterData);

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
    const chapter = await prisma.chapter.findFirst({
      where: {
        id: Number(chapterId),
      },
    });

    if (!chapter) {
      return {
        success: false,
        message: "Chapter not found!",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Error while verifying chapter!",
    };
  }

  try {
    const updatedChapterData = await prisma.chapter.update({
      where: {
        id: Number(chapterId),
      },
      data: {
        chapterName: data.chapterName,
        sortingOrder: data.chapterNo,
      },
    });

    return {
      success: true,
      message: "chapter updated successfully!",
      chapter: updatedChapterData
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Error while updating data",
    };
  }
};
export const deleteChapter = async (chapterId: string) => {
    
};

export default createChapter;
