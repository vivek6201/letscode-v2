import prisma from "@/lib/db";
import { addFolderValidations } from "@/validations/tutorialValidations";
import { ContentType, TopicMetadata } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const reqData: {
    type: ContentType;
    title: string;
    sortingOrder: number;
    parentContentId: number;
    tutorialId: number;
    description: string;
    thumbnail?: string;
    topicMetadata?: TopicMetadata;
  } = await req.json();

  //TODO: check admin role before proceeding
  try {
    await prisma.$transaction(async (tx) => {
      const content = await tx.content.create({
        data: {
          title: reqData.title,
          type: reqData.type,
          parentId: reqData.parentContentId,
          sortingOrder: reqData.sortingOrder,
          description: reqData.description,
          thumbnail: reqData.thumbnail,
        },
      });

      if (reqData.type === "Folder") {
        await tx.tutorialContent.create({
          data: {
            tutorialsId: reqData.tutorialId,
            contentId: content.id,
          },
        });
      } else if (reqData.type === "Content" && reqData.topicMetadata) {
        await tx.topicMetadata.create({
          data: {
            content: reqData.topicMetadata?.content,
            slug: reqData.topicMetadata.slug,
            metaDescription: reqData.description,
            contentId: content.id,
            metaTitle: reqData.topicMetadata.metaTitle,
          },
        });

        await tx.tutorialContent.create({
          data: {
            tutorialsId: reqData.tutorialId,
            contentId: content.id,
          },
        });
      }
    });

    return NextResponse.json(
      {
        success: true,
        message: "Content created Successfully!",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Error occurred while creating content!",
      },
      { status: 500 }
    );
  }
};
