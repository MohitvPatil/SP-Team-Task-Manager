import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { authCookies } from "@/lib/auth";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(authCookies.refresh)?.value;

  const response = NextResponse.json({ message: "Logged out successfully" });
  response.cookies.delete(authCookies.access);
  response.cookies.delete(authCookies.refresh);
  response.cookies.delete(authCookies.legacy);
  return response;
}
