import { NextResponse } from "next/server";
import { apiError, handleApiError, isApiResponse, requireUser } from "@/lib/api";
import { sampleComments, sampleTasks } from "@/lib/sample-data";
import { taskUpdateSchema } from "@/lib/validations";

type Ctx = { params: Promise<{ id: string }> };

async function requireTaskAccess(taskId: string) {
  const user = await requireUser();
  if (isApiResponse(user)) return user;
  const task = sampleTasks.find((item) => item.id === taskId);
  if (!task) return apiError("Task not found", 404);
  return { user, task };
}

export async function GET(_req: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  const access = await requireTaskAccess(id);
  if (isApiResponse(access)) return access;

  const task = {
    ...access.task,
    comments: sampleComments.filter((comment) => comment.taskId === id),
  };
  return NextResponse.json(task);
}

export async function PUT(req: Request, ctx: Ctx) {
  try {
    const { id } = await ctx.params;
    const access = await requireTaskAccess(id);
    if (isApiResponse(access)) return access;

    const body = taskUpdateSchema.parse(await req.json());
    const updatedTask = {
      ...access.task,
      ...body,
      dueDate: body.dueDate ?? access.task.dueDate,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(updatedTask);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_req: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  const access = await requireTaskAccess(id);
  if (isApiResponse(access)) return access;

  return NextResponse.json({ message: "Task deleted successfully" });
}
