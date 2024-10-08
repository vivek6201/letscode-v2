import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const session = await auth();

    if (session?.user) {
      let tutorials;
      if (session.user.role === "User") {
        tutorials = await prisma.tutorials.findMany({
          where: {
            status: "Published",
          },
        });
      } else {
        tutorials = await prisma.tutorials.findMany({});
      }

      return NextResponse.json({
        success: true,
        message: "Tutorial Fetched successfully!",
        tutorials,
      });
    }

    const tutorials = await prisma.tutorials.findMany({
      where: {
        status: "Published",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Tutorial Fetched successfully!",
      tutorials,
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
