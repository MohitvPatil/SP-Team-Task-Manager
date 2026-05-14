import { NextResponse } from "next/server";
import { extendedEmployees } from "@/lib/employees-data";

export async function GET() {
  // Simulate database delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return NextResponse.json(extendedEmployees);
}
