import prisma from "@/lib/db";
import { type NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    //update acc to role of user!
    const searchParams = req.nextUrl.searchParams;
    const slug = searchParams.get("tutorialSlug");

    if (!slug) {
      return NextResponse.json({
        success: false,
        message: "Tutorial slug is Required!",
      });
    }

    const tutorial = await prisma.tutorials.findFirst({
      where: {
        slug,
      },
    });

    if (!tutorial)
      return {
        success: false,
        message: "Invalid Slug",
      };

    //think from here
    const chapters = await prisma.chapter.findMany({
      where: {
        tutorialsId: tutorial.id,
      },
      include: {
        _count: true,
      },
      orderBy: {
        sortingOrder: "asc",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Chapters Fetched successfully!",
      chapters,
    });
  } catch (error) {
    console.error("error", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error while fetching Data",
      },
      { status: 500 }
    );
  }
};
