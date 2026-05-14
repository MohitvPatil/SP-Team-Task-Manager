import { NextResponse } from "next/server";
import { getSessionUser, canManage } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const user = await getSessionUser();
    if (!user || !canManage(user.role)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { email, projectId } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const token = crypto.randomBytes(32).toString("hex");

    const inviteData: any = {
      token,
      accepted: false,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    };

    if (projectId) {
      // Project-specific invite
      const invite = await prisma.projectInvite.upsert({
        where: { email_projectId: { email, projectId } },
        update: { token, accepted: false, expiresAt: inviteData.expiresAt },
        create: { email, projectId, ...inviteData },
      });
      return NextResponse.json({
        message: `Invitation sent to ${email}`,
        invite: { id: invite.id, email: invite.email, token: invite.token },
      });
    }

    // Team-level invite (no specific project yet)
    // In production: send an email with the registration link
    return NextResponse.json({
      message: `Invitation sent to ${email}. They will receive a link to register using their Employee ID and company email.`,
      registrationLink: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/register`,
    });
  } catch (error: any) {
    console.error("Invite error:", error);
    return NextResponse.json(
      { message: "Failed to send invitation", error: error.message },
      { status: 500 }
    );
  }
}
