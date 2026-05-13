import crypto from "crypto";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { sampleUser } from "@/lib/sample-data";

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "MANAGER" | "MEMBER";
};

type AccessTokenPayload = {
  userId: string;
  role: SessionUser["role"];
};

const ACCESS_COOKIE = "taskflow_access";
const REFRESH_COOKIE = "taskflow_refresh";
const LEGACY_COOKIE = "token";

const accessSecret = () => process.env.JWT_SECRET ?? "development-jwt-secret-change-me";
const refreshSecret = () => process.env.JWT_REFRESH_SECRET ?? `${accessSecret()}-refresh`;

export const authCookies = {
  access: ACCESS_COOKIE,
  refresh: REFRESH_COOKIE,
  legacy: LEGACY_COOKIE,
};

export function generateToken(userId: string, role: string) {
  return jwt.sign({ userId, role }, accessSecret(), { expiresIn: "15m" });
}

export function generateRefreshToken(userId: string) {
  return jwt.sign({ userId, nonce: crypto.randomUUID() }, refreshSecret(), { expiresIn: "30d" });
}

export function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function verifyToken(token: string) {
  return jwt.verify(token, accessSecret()) as AccessTokenPayload;
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, refreshSecret()) as { userId: string; nonce: string };
}

export async function createRefreshSession(userId: string) {
  return generateRefreshToken(userId);
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ACCESS_COOKIE)?.value ?? cookieStore.get(LEGACY_COOKIE)?.value;
  if (!token) return null;

  try {
    const payload = verifyToken(token);
    if (payload.userId !== sampleUser.id) return null;
    return sampleUser;
  } catch {
    return null;
  }
}

export function canManage(role: SessionUser["role"]) {
  return role === "ADMIN" || role === "MANAGER";
}
