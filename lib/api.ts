import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { getSessionUser, type SessionUser } from "@/lib/auth";

export function apiError(message: string, status = 400) {
  return NextResponse.json({ message }, { status });
}

export function handleApiError(error: unknown) {
  if (error instanceof ZodError) {
    return NextResponse.json(
      { message: "Validation failed", issues: error.issues },
      { status: 422 },
    );
  }

  console.error(error);
  return NextResponse.json({ message: "Internal server error" }, { status: 500 });
}

export async function requireUser(): Promise<SessionUser | NextResponse> {
  const user = await getSessionUser();
  return user ?? apiError("Authentication required", 401);
}

export function isApiResponse(value: unknown): value is NextResponse {
  return value instanceof NextResponse;
}
