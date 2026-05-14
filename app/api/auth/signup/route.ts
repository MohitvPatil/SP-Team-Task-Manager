import { NextResponse } from "next/server";
import { handleApiError } from "@/lib/api";
import { authCookies, createRefreshSession, generateToken } from "@/lib/auth";
import { sampleUser, toPublicUser, sampleTeamMembers } from "@/lib/sample-data";
import { extendedEmployees } from "@/lib/employees-data";
import { registerSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const body = registerSchema.parse(await req.json());

    // ── Step 1: Validate Employee ID against the employee database ──────────
    const employeeRecord = extendedEmployees.find(
      (e) => e.employeeId === body.employeeId
    );
    const teamMember = sampleTeamMembers.find(
      (m) => m.employeeId === body.employeeId
    );

    if (!employeeRecord || !teamMember) {
      return NextResponse.json(
        { message: "Invalid Employee ID. Please use the ID provided by your company." },
        { status: 400 }
      );
    }

    // ── Step 2: Verify the email matches the employee's registered company email ──
    if (teamMember.email !== body.email) {
      return NextResponse.json(
        { message: "Email does not match the company email for this Employee ID." },
        { status: 400 }
      );
    }

    // ── Step 3: Auto-populate name from employee database (no manager input needed) ──
    const autoName = teamMember.name; // Name is fetched directly from the employee DB

    // ── Step 4: Build the user record ──────────────────────────────────────────
    const user = toPublicUser({
      ...sampleUser,
      id: teamMember.id,
      employeeId: body.employeeId,
      name: autoName,
      email: body.email,
      role: teamMember.role,
    });

    // ── Step 5: Generate auth tokens ──────────────────────────────────────────
    const accessToken = generateToken(teamMember.id, teamMember.role);
    const refreshToken = await createRefreshSession(teamMember.id);

    // ── Step 6: Return user + mark invite as accepted (sample mode) ───────────
    // In production: prisma.projectInvite.updateMany({ where: { email }, data: { accepted: true } })
    const response = NextResponse.json(
      {
        user,
        message: `Welcome ${autoName}! Your employee profile has been automatically linked.`,
        // In production this would trigger a notification to the manager
        notification: {
          type: "INVITE_ACCEPTED",
          message: `${autoName} (${body.employeeId}) has accepted the invite and joined the team.`,
        },
      },
      { status: 201 }
    );

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
