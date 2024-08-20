"use server";

import prisma from "@/lib/db";
import { addTopicsValidations } from "@/validations/tutorialValidations";
import { z } from "zod";

type TopicType = z.infer<typeof addTopicsValidations>;

const createTopic = async (topicData: TopicType, chapterId: number) => {
  const { data, success, error } = await addTopicsValidations.safeParseAsync(
    topicData
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

  let chapter = null;

  try {
    chapter = await prisma.chapter.findUnique({
      where: {
        id: chapterId,
      },
    });

    if (!chapter) {
      return {
        success: false,
        error: "Chapter Not found!",
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
    await prisma.topic.create({
      data: {
        chapterId: chapter.id,
        topicName: data.topicName,
        sortingOrder: data.topicNo,
        slug: data.slug,
        content: data.content,
        description: data.description,
      },
    });

    return {
      success: true,
      message: "Topic created Successfully",
    };
  } catch (error) {
    console.error("error", error);
    return {
      success: false,
      error: "Failed to created topic",
    };
  }
};

export const updateTopic = async (topicData: TopicType, topicId: number) => {
  const { data, error, success } = await addTopicsValidations
    .partial()
    .safeParseAsync(topicData);

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
    const topic = await prisma.topic.findFirst({
      where: {
        id: Number(topicId),
      },
    });

    if (!topic) {
      return {
        success: false,
        message: "Topic not found!",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Error while verifying topic!",
    };
  }

  try {
    const updatedTopicData = await prisma.chapter.update({
      where: {
        id: Number(topicId),
      },
      data: {
        chapterName: data.topicName,
        sortingOrder: data.topicNo,
      },
    });

    return {
      success: true,
      message: "topic updated successfully!",
      topic: updatedTopicData
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Error while updating data",
    };
  }

};

export const deleteTopic = async () => {};

export default createTopic;
