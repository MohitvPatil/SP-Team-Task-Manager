import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ message: "Token is required" }, { status: 400 });
    }

    const invite = await prisma.projectInvite.findUnique({
      where: { token },
    });

    if (!invite || invite.accepted || invite.expiresAt < new Date()) {
      return NextResponse.json({ message: "Invalid or expired invite" }, { status: 400 });
    }

    // In this sample app, we'll check the User table.
    // If the user doesn't exist, they need to sign up first.
    const user = await prisma.user.findUnique({
      where: { email: invite.email },
    });

    if (!user) {
      return NextResponse.json({ 
        message: "User not found. Please register with this email first.",
        email: invite.email 
      }, { status: 404 });
    }

    // Create the membership
    await prisma.projectMember.create({
      data: {
        userId: user.id,
        projectId: invite.projectId,
        role: invite.role,
        position: invite.position,
      },
    });

    // Mark invite as accepted
    await prisma.projectInvite.update({
      where: { id: invite.id },
      data: { accepted: true },
    });

    return NextResponse.json({ message: "Invite accepted successfully" });
  } catch (error: any) {
    console.error("Accept invite error:", error);
    return NextResponse.json(
      { message: "Failed to accept invite", error: error.message },
      { status: 500 }
    );
  }
}
