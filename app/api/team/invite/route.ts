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

    const { email, projectId, role, position } = await req.json();

    if (!email || !projectId) {
      return NextResponse.json(
        { message: "Missing required fields: email and projectId are required" },
        { status: 400 }
      );
    }

    const token = crypto.randomBytes(32).toString("hex");

    const invite = await prisma.projectInvite.upsert({
      where: {
        email_projectId: {
          email,
          projectId,
        },
      },
      update: {
        role: role || "MEMBER",
        position: position || "Staff",
        token,
        accepted: false,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
      create: {
        email,
        projectId,
        role: role || "MEMBER",
        position: position || "Staff",
        token,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return NextResponse.json({
      message: `Invitation sent to ${email}`,
      invite: {
        id: invite.id,
        email: invite.email,
        token: invite.token,
      },
    });
  } catch (error: any) {
    console.error("Invite error:", error);
    return NextResponse.json(
      { message: "Failed to send invitation", error: error.message },
      { status: 500 }
    );
  }
}
