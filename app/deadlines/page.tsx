import Link from "next/link";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import PageHeader from "@/components/ui/PageHeader";
import Sidebar from "@/components/ui/Sidebar";
import Topbar from "@/components/ui/Topbar";
import { sampleProjects, sampleTasks } from "@/lib/sample-data";

const dateText = (value: string | null) =>
  value
    ? new Intl.DateTimeFormat("en", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(new Date(value))
    : "No date";

export default function DeadlinesPage() {
  const projectDeadlines = [...sampleProjects].sort(
    (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime(),
  );
  const taskDeadlines = [...sampleTasks]
    .filter((task) => task.dueDate)
    .sort((a, b) => new Date(a.dueDate || "").getTime() - new Date(b.dueDate || "").getTime());

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />

        <main className="flex-1 p-8">
          <Topbar />
          <PageHeader
            title="Deadlines"
            description="Project deadlines and task due dates in one place."
          />

          <section className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold">Project Deadlines</h2>
              <div className="mt-5 space-y-4">
                {projectDeadlines.map((project) => (
                  <Link
                    href={`/projects/${project.id}`}
                    key={project.id}
                    className="block rounded-lg border border-gray-200 p-4 hover:border-gray-400"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold">{project.title}</p>
                        <p className="mt-1 text-sm text-gray-500">{project.description}</p>
                      </div>
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold">
                        {project.health}
                      </span>
                    </div>
                    <p className="mt-4 text-sm font-semibold">Deadline: {dateText(project.deadline)}</p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold">Task Due Dates</h2>
              <div className="mt-5 space-y-4">
                {taskDeadlines.map((task) => (
                  <div key={task.id} className="rounded-lg border border-gray-200 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold">{task.title}</p>
                        <p className="mt-1 text-sm text-gray-500">{task.project.title}</p>
                      </div>
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold">
                        {task.status.replace("_", " ")}
                      </span>
                    </div>
                    <p className="mt-4 text-sm font-semibold">Due: {dateText(task.dueDate)}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </ProtectedRoute>
  );
}
