
import { verifyToken } from "@/lib/auth";

export const authenticate = (token: string) => {
  try {
    return verifyToken(token);
  } catch {
    return null;
  }
};