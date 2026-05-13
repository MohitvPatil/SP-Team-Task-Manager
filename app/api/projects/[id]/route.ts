import { NextResponse } from "next/server";
import { apiError, handleApiError, isApiResponse, requireUser } from "@/lib/api";
import { canManage } from "@/lib/auth";
import { sampleProjects, sampleTasks } from "@/lib/sample-data";
import { projectSchema } from "@/lib/validations";

type Ctx = { params: Promise<{ id: string }> };

async function requireProjectAccess(projectId: string) {
  const user = await requireUser();
  if (isApiResponse(user)) return user;

  const project = sampleProjects.find((item) => item.id === projectId);
  const membership = project?.members.find((member) => member.userId === user.id);
  if (!membership) return apiError("Project not found", 404);
  return { user, membership };
}

export async function GET(_req: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  const access = await requireProjectAccess(id);
  if (isApiResponse(access)) return access;

  const project = sampleProjects.find((item) => item.id === id);

  return NextResponse.json({
    ...project,
    tasks: sampleTasks.filter((task) => task.projectId === id),
  });
}

export async function PUT(req: Request, ctx: Ctx) {
  try {
    const { id } = await ctx.params;
    const access = await requireProjectAccess(id);
    if (isApiResponse(access)) return access;
    if (!canManage(access.membership.role)) return apiError("Insufficient permissions", 403);

    const body = projectSchema.parse(await req.json());
    const project = sampleProjects.find((item) => item.id === id);
    if (!project) return apiError("Project not found", 404);
    const updatedProject = {
      ...project,
      title: body.title,
      description: body.description ?? null,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(updatedProject);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_req: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  const access = await requireProjectAccess(id);
  if (isApiResponse(access)) return access;
  if (!canManage(access.membership.role)) return apiError("Insufficient permissions", 403);

  return NextResponse.json({ message: "Project deleted successfully" });
}
