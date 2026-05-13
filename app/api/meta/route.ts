import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({
    app: "TaskFlow SaaS",
    status: "ok",
    dataSource: "sample metadata",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
  });
}
