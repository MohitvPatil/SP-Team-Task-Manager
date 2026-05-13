import { NextResponse } from "next/server";

export async function POST(
  req: Request
) {
  try {
    const body =
      await req.json();

    return NextResponse.json({
      message: `Invitation sent to ${body.email}`,
    });
  } catch {
    return NextResponse.json(
      {
        message:
          "Failed to send invitation",
      },
      {
        status: 500,
      }
    );
  }
}
