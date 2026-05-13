import { NextResponse } from "next/server";
import { apiError, handleApiError, isApiResponse, requireUser } from "@/lib/api";
import { createSampleId, sampleComments, sampleTasks } from "@/lib/sample-data";
import { commentSchema } from "@/lib/validations";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, ctx: Ctx) {
  const user = await requireUser();
  if (isApiResponse(user)) return user;
  const { id } = await ctx.params;

  const task = sampleTasks.find((item) => item.id === id);
  if (!task) return apiError("Task not found", 404);

  const comments = sampleComments.filter((comment) => comment.taskId === id);

  return NextResponse.json(comments);
}

export async function POST(req: Request, ctx: Ctx) {
  try {
    const user = await requireUser();
    if (isApiResponse(user)) return user;
    const { id } = await ctx.params;

    const task = sampleTasks.find((item) => item.id === id);
    if (!task) return apiError("Task not found", 404);

    const body = commentSchema.parse(await req.json());
    const comment = {
      id: createSampleId("comment"),
      body: body.body,
      taskId: id,
      userId: user.id,
      deletedAt: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      user: { id: user.id, name: user.name, imageUrl: null },
    };

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
