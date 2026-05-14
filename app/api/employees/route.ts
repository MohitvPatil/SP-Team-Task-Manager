import { NextResponse } from "next/server";
import { sampleTeamMembers } from "@/lib/sample-data";
import { extendedEmployees, EmployeeFullDetail } from "@/lib/employees-data";

export async function GET() {
  // Simulate database delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Merge Primary (sampleTeamMembers) and Secondary (extendedEmployees) data
  const combinedData: EmployeeFullDetail[] = sampleTeamMembers.map((primary) => {
    const secondary = extendedEmployees.find((e) => e.id === primary.id);
    
    return {
      id: primary.id,
      name: primary.name,
      email: primary.email,
      role: primary.role,
      position: primary.position,
      department: primary.department,
      // Fallback to default values if secondary data is missing
      phone: secondary?.phone || "+91 00000 00000",
      joinedDate: secondary?.joinedDate || new Date().toISOString(),
      salary: secondary?.salary || "₹0",
      address: secondary?.address || "Address not available",
      projects: secondary?.projects || [],
      imageUrl: primary.imageUrl || secondary?.imageUrl || null,
    };
  });

  return NextResponse.json(combinedData);
}
