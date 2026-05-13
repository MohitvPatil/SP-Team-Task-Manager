import { NextResponse } from "next/server";
import { handleApiError, isApiResponse, requireUser } from "@/lib/api";
import { createSampleId, sampleProjects, sampleUser } from "@/lib/sample-data";
import { projectSchema } from "@/lib/validations";

export async function GET(req: Request) {
  const user = await requireUser();
  if (isApiResponse(user)) return user;

  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim();

  const projects = sampleProjects.filter((project) =>
    q ? project.title.toLowerCase().includes(q.toLowerCase()) : true,
  );

  return NextResponse.json(projects);
}

export async function POST(req: Request) {
  try {
    const user = await requireUser();
    if (isApiResponse(user)) return user;

    const body = projectSchema.parse(await req.json());
    const project = {
      id: createSampleId("project"),
      title: body.title,
      description: body.description ?? null,
      ownerId: user.id,
      deletedAt: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      owner: sampleUser,
      members: [
        {
          id: createSampleId("member"),
          userId: user.id,
          projectId: "sample-project",
          role: user.role,
          createdAt: new Date().toISOString(),
          user: sampleUser,
        },
      ],
      _count: { tasks: 0 },
    };

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
