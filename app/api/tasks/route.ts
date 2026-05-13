import { NextResponse } from "next/server";
import { apiError, handleApiError, isApiResponse, requireUser } from "@/lib/api";
import { createSampleId, sampleProjects, sampleTasks, sampleUser } from "@/lib/sample-data";
import { taskSchema } from "@/lib/validations";

export async function GET(req: Request) {
  const user = await requireUser();
  if (isApiResponse(user)) return user;

  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId") ?? undefined;
  const status = searchParams.get("status") ?? undefined;
  const q = searchParams.get("q")?.trim();

  const tasks = sampleTasks.filter((task) => {
    if (projectId && task.projectId !== projectId) return false;
    if (status && task.status !== status) return false;
    if (q && !task.title.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  return NextResponse.json(tasks);
}

export async function POST(req: Request) {
  try {
    const user = await requireUser();
    if (isApiResponse(user)) return user;

    const body = taskSchema.parse(await req.json());
    const project = sampleProjects.find((item) => item.id === body.projectId);
    const membership = project?.members.find((member) => member.userId === user.id);
    if (!project || !membership) return apiError("Project not found", 404);

    const task = {
      id: createSampleId("task"),
      title: body.title,
      description: body.description ?? null,
      priority: body.priority,
      status: body.status,
      dueDate: body.dueDate ?? null,
      order: sampleTasks.length,
      assignedToId: body.assignedToId ?? null,
      createdById: user.id,
      projectId: body.projectId,
      deletedAt: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      assignedTo: body.assignedToId ? sampleUser : null,
      project: { id: project.id, title: project.title },
      comments: [],
      attachments: [],
    };

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
