import { NextResponse } from "next/server";
import { handleApiError } from "@/lib/api";
import { authCookies, createRefreshSession, generateToken } from "@/lib/auth";
import { sampleUser, toPublicUser } from "@/lib/sample-data";
import { loginSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const body = loginSchema.parse(await req.json());
    const user = { ...sampleUser, email: body.email };
    const accessToken = generateToken(sampleUser.id, sampleUser.role);
    const refreshToken = await createRefreshSession(sampleUser.id);
    const response = NextResponse.json({
      user: toPublicUser(user),
    });

    response.cookies.set(authCookies.access, accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 15 * 60,
    });
    response.cookies.set(authCookies.refresh, refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 30 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    return handleApiError(error);
  }
}
