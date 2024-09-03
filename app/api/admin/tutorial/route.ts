import { TopicMetadata } from "@/db/tutorials";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { ContentType, Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const session = await auth();

  const reqData: {
    id?: number | null;
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
  if (session?.user.role !== "Admin") {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized access",
      },
      { status: 403 }
    );
  }

  try {
    await prisma.$transaction(async (tx) => {
      const content = await tx.content.upsert({
        where: {
          id: reqData?.id ?? -1,
        },
        create: {
          title: reqData.title,
          type: reqData.type,
          parentId: reqData.parentContentId,
          sortingOrder: reqData.sortingOrder,
          description: reqData.description,
          thumbnail: reqData.thumbnail,
        },
        update: {
          title: reqData.title,
          sortingOrder: reqData.sortingOrder,
          description: reqData.description,
          thumbnail: reqData.thumbnail,
        },
      });

      if (reqData.type === "Folder") {
        await tx.tutorialContent.upsert({
          where: {
            tutorialsId_contentId: {
              tutorialsId: reqData.tutorialId,
              contentId: content.id,
            },
          },
          create: {
            tutorialsId: reqData.tutorialId,
            contentId: content.id,
          },
          update: {
            // No need to update anything if the combination is already present
          },
        });
      } else if (reqData.type === "Content" && reqData.topicMetadata) {
        await tx.topicMetadata.upsert({
          where: {
            contentId: content.id,
          },
          create: {
            content: reqData.topicMetadata?.content ?? Prisma.JsonNull,
            slug: reqData.topicMetadata.slug,
            metaDescription: reqData.description,
            contentId: content.id,
            metaTitle: reqData.topicMetadata.metaTitle,
          },
          update: {
            content: reqData.topicMetadata?.content ?? Prisma.JsonNull,
            slug: reqData.topicMetadata.slug,
            metaDescription: reqData.description,
            metaTitle: reqData.topicMetadata.metaTitle,
          },
        });

        await tx.tutorialContent.upsert({
          where: {
            tutorialsId_contentId: {
              tutorialsId: reqData.tutorialId,
              contentId: content.id,
            },
          },
          create: {
            tutorialsId: reqData.tutorialId,
            contentId: content.id,
          },
          update: {
            // No need to update anything if the combination is already present
          },
        });
      }
    });

    return NextResponse.json(
      {
        success: true,
        message: reqData.id
          ? "Content updated successfully"
          : "Content created Successfully!",
      },
      { status: reqData.id ? 200 : 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Error occurred while performing creation/updation action!",
      },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: NextRequest) => {

  const session = await auth();

  const reqData: {
    contentId: number;
  } = await req.json();

  if (!reqData.contentId)
    return NextResponse.json(
      {
        success: false,
        message: "Content id not provided",
      },
      { status: 403 }
    );

  if (session?.user.role !== "Admin") {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized access",
      },
      { status: 403 }
    );
  }

  let content = null;
  try {
    content = await prisma.content.findUnique({
      where: {
        id: reqData.contentId,
      },
      include: {
        _count: {
          select: {
            children: true,
          },
        },
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Error while verifying content id",
      },
      { status: 500 }
    );
  }

  if (!content)
    return NextResponse.json(
      {
        success: false,
        message: "Content id is invalid",
      },
      { status: 403 }
    );

  if (content._count.children <= 0)
    try {
      await prisma.content.delete({
        where: {
          id: reqData.contentId,
        },
      });
      return NextResponse.json({
        success: true,
        message: "Content deleted successfully",
      });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        {
          success: false,
          message: "Content deletion failed",
        },
        { status: 500 }
      );
    }
  else
    return NextResponse.json(
      {
        success: false,
        message: "This content has children inside it. first delete them",
      },
      { status: 200 }
    );
};
