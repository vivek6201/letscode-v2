import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    // modify according to role later!
    const tutorials = await prisma.tutorials.findMany();

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
