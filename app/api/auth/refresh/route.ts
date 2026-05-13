import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { authCookies, generateToken, verifyRefreshToken } from "@/lib/auth";
import { sampleUser, toPublicUser } from "@/lib/sample-data";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(authCookies.refresh)?.value;
  if (!refreshToken) {
    return NextResponse.json({ message: "Refresh token missing" }, { status: 401 });
  }

  try {
    const payload = verifyRefreshToken(refreshToken);
    if (payload.userId !== sampleUser.id) {
      return NextResponse.json({ message: "Refresh token invalid" }, { status: 401 });
    }

    const response = NextResponse.json({
      user: toPublicUser(),
    });
    response.cookies.set(authCookies.access, generateToken(sampleUser.id, sampleUser.role), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 15 * 60,
    });
    return response;
  } catch {
    return NextResponse.json({ message: "Refresh token invalid" }, { status: 401 });
  }
}
