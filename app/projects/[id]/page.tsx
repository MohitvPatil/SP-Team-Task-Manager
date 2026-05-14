import Sidebar from "@/components/ui/Sidebar";

import Topbar from "@/components/ui/Topbar";

import ProjectDetails from "@/components/projects/ProjectDetails";

import DragDropBoard from "@/components/kanban/DragDropBoard";

import ProjectMembers from "@/components/projects/ProjectMembers";

import TeamChat from "@/components/dashboard/TeamChat";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sampleProjects, sampleTasks } from "@/lib/sample-data";

type Props = { params: Promise<{ id: string }> };

const dateText = (value: string) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));

export default async function SingleProjectPage({ params }: Props) {
  const { id } = await params;
  const project = sampleProjects.find((item) => item.id === id);
  if (!project) notFound();

  const tasks = sampleTasks.filter((task) => task.projectId === id);

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-100 p-8">
        <Topbar />

        <ProjectDetails
          title={project.title}
          description={project.description}
        />

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-4">
          {[
            ["Progress", `${project.progress}%`],
            ["Health", project.health],
            ["Assigned", dateText(project.assignedAt)],
            ["Deadline", dateText(project.deadline)],
            ["Tasks", tasks.length],
          ].map(([label, value]) => (
            <div key={label} className="rounded-lg bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-500">{label}</p>
              <p className="mt-3 text-2xl font-bold">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">Team Involved</h2>
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {project.members.map((member) => (
              <div key={member.id} className="rounded-lg border border-gray-200 p-4">
                <p className="font-semibold">{member.user.name}</p>
                <p className="mt-1 text-sm text-gray-500">{member.position}</p>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span>{member.user.role}</span>
                  <span>{member.user.department}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-lg bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold">Related Tasks</h2>
            <Link href="/tasks" className="text-sm font-semibold text-gray-600">
              All tasks
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {tasks.map((task) => (
              <div key={task.id} className="rounded-lg border border-gray-200 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold">{task.title}</p>
                    <p className="mt-1 text-sm text-gray-500">{task.description}</p>
                  </div>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold">
                    {task.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <ProjectMembers />
        </div>

        <div className="mt-8">
          <TeamChat />
        </div>

        <div className="mt-8">
          <DragDropBoard />
        </div>
      </div>
    </div>
  );
}
