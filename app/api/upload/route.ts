import { NextResponse } from "next/server";

export async function POST() {
  try {
    return NextResponse.json({
      url: "/uploads/file.png",
      message:
        "File uploaded successfully",
    });
  } catch {
    return NextResponse.json(
      {
        message:
          "Upload failed",
      },
      {
        status: 500,
      }
    );
  }
}