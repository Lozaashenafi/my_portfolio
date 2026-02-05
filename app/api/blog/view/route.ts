import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma"; // Adjust this path to your prisma file

export async function POST(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    // Increment the view in the database
    const updatedPost = await prisma.blogPost.update({
      where: { id: id },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({ success: true, views: updatedPost.views });
  } catch (error) {
    console.error("View increment error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
