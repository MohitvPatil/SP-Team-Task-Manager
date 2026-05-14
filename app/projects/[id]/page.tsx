"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import ProjectModal, { ProjectFormData, ProjectState, ProjectHealth } from "@/components/projects/ProjectModal";
import TaskModal, { TaskFormData } from "@/components/projects/TaskModal";
import ManageEmployeesModal from "@/components/projects/ManageEmployeesModal";
import Navbar from "@/components/ui/Navbar";
import {
  sampleProjects,
  sampleTasks,
  sampleComments,
  sampleUser,
  sampleTeamMembers,
  createSampleId,
} from "@/lib/sample-data";
import {
  CalendarDays,
  Clock,
  Users,
  ChevronLeft,
  CheckCircle2,
  Circle,
  AlertCircle,
  MessageSquare,
  Plus,
} from "lucide-react";

const fmt = (iso: string | null) =>
  iso
    ? new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(
        new Date(iso)
      )
    : "—";

const toInputDate = (iso: string | null) => (iso ? iso.slice(0, 10) : "");

const buildEmployees = (projectId: string, userIds: string[]) =>
  userIds.map((uid) => {
    const u = sampleTeamMembers.find((m) => m.id === uid) ?? sampleTeamMembers[0];
    return {
      id: `member-${projectId}-${u.id}`,
      userId: u.id,
      projectId,
      role: u.role,
      position: u.position,
      createdAt: new Date().toISOString(),
      user: u,
    };
  });

export default function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [newComment, setNewComment] = useState("");
  const [modal, setModal] = useState(false);
  const [taskModal, setTaskModal] = useState(false);
  const [employeesModal, setEmployeesModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const isLead = sampleUser.role === "ADMIN" || sampleUser.role === "MANAGER";

  const initialProject = sampleProjects.find((p) => p.id === id);
  if (!initialProject) return notFound();

  const [project, setProject] = useState(initialProject);

  const [tasks, setTasks] = useState<typeof sampleTasks>(() => sampleTasks.filter((t) => t.projectId === id));
  const [comments, setComments] = useState<typeof sampleComments>(() => 
    sampleComments.filter((c) => c.taskId && sampleTasks.find(t => t.id === c.taskId && t.projectId === id))
  );

  const toggleTask = (taskId: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id !== taskId) return t;
      return { ...t, status: t.status === "COMPLETED" ? "TODO" : "COMPLETED" };
    }));
  };

  const addComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const taskId = tasks[0]?.id || "";
    setComments(prev => [
      {
        id: createSampleId("comment"),
        body: newComment,
        taskId,
        userId: sampleUser.id,
        deletedAt: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        user: sampleUser,
      },
      ...prev
    ]);
    setNewComment("");
  };

  const handleSave = (data: ProjectFormData) => {
    const updated = {
      ...project,
      title: data.title,
      description: data.description,
      assignedAt: data.assignedAt ? new Date(data.assignedAt).toISOString() : project.assignedAt,
      deadline: data.deadline ? new Date(data.deadline).toISOString() : project.deadline,
      state: data.state,
      health: data.health,
      completedAt: data.state === "COMPLETED" ? (project.completedAt ?? new Date().toISOString()) : null,
      updatedAt: new Date().toISOString(),
    };
    const idx = sampleProjects.findIndex(p => p.id === project.id);
    if (idx !== -1) sampleProjects[idx] = updated;
    setProject(updated);
    setModal(false);
  };

  const handleSaveEmployees = (employeeIds: string[]) => {
    const updatedEmployees = buildEmployees(project.id, employeeIds);
    const updated = {
      ...project,
      members: updatedEmployees,
      updatedAt: new Date().toISOString(),
    };
    const idx = sampleProjects.findIndex(p => p.id === project.id);
    if (idx !== -1) sampleProjects[idx] = updated;
    setProject(updated);
    setEmployeesModal(false);
  };

  const handleSaveTask = (data: TaskFormData) => {
    const newTask = {
      id: createSampleId("task"),
      projectId: project.id,
      title: data.title,
      description: data.description,
      status: "TODO" as any,
      priority: data.priority,
      dueDate: data.dueDate ? new Date(data.dueDate).toISOString() : null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      assignedToId: data.assignedToId,
      assignedTo: data.assignedToId ? sampleTeamMembers.find(m => m.id === data.assignedToId) ?? null : null,
      deletedAt: null,
    };
    sampleTasks.push(newTask as any);
    setTasks(prev => [newTask as any, ...prev]);
    setTaskModal(false);
  };

  const handleDeleteConfirm = () => {
    const idx = sampleProjects.findIndex(p => p.id === project.id);
    if (idx !== -1) sampleProjects.splice(idx, 1);
    router.push("/dashboard");
  };

  const done = project.state === "COMPLETED";
  const onHold = project.state === "ON_HOLD";
  const planning = project.state === "PLANNING";
  const atRisk = project.health === "At Risk";

  const badgeClass = done ? "bg-green-50 text-green-700" : onHold ? "bg-yellow-50 text-yellow-700" : planning ? "bg-purple-50 text-purple-700" : atRisk ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-700";
  const badgeLabel = done ? "Done" : onHold ? "On Hold" : project.health;

  const completedTasks = tasks.filter((t) => t.status === "COMPLETED");
  const initialForm: ProjectFormData = {
    title: project.title,
    description: project.description ?? "",
    assignedAt: toInputDate(project.assignedAt),
    deadline: toInputDate(project.deadline),
    state: project.state as ProjectState,
    health: project.health as ProjectHealth,
  };

  return (
    <ProtectedRoute>
      {modal && <ProjectModal initial={initialForm} onSave={handleSave} onClose={() => setModal(false)} />}
      {taskModal && <TaskModal onSave={handleSaveTask} onClose={() => setTaskModal(false)} />}
      {employeesModal && <ManageEmployeesModal initialEmployeeIds={project.members.map(m => m.userId)} onSave={handleSaveEmployees} onClose={() => setEmployeesModal(false)} />}
      
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm transition-all">
          <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl">
            <h2 className="mb-2 text-lg font-bold text-gray-900">Delete Project</h2>
            <p className="mb-6 text-sm text-gray-600">
              Are you sure you want to delete <span className="font-semibold text-gray-900">{project.title}</span>? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowDeleteConfirm(false)} className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition">Cancel</button>
              <button onClick={handleDeleteConfirm} className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition">Delete</button>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
        <Navbar />

        <main className="mx-auto max-w-5xl px-4 py-8 md:px-8">
          <Link href="/dashboard" className="mb-6 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900"><ChevronLeft size={16} />Back to Dashboard</Link>

          <div className="mb-8 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 p-6 shadow-sm sm:p-8 transition-colors">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{project.title}</h1>
                  <span className={`rounded-md px-2.5 py-1 text-xs font-semibold ${badgeClass}`}>{badgeLabel}</span>
                </div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 max-w-2xl">{project.description}</p>
              </div>
              {isLead && (
                <div className="flex items-center gap-2">
                  <button onClick={() => setModal(true)} className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700">Edit Project</button>
                  <button onClick={() => setShowDeleteConfirm(true)} className="rounded-lg border border-red-100 bg-white px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:bg-red-900/20 dark:border-red-900/30">Delete</button>
                </div>
              )}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-6 border-t border-gray-100 dark:border-gray-800 pt-6 sm:grid-cols-4">
              <div><p className="flex items-center gap-1.5 text-xs font-medium text-gray-500"><Clock size={14} /> Start Date</p><p className="mt-1.5 text-sm font-semibold text-gray-900 dark:text-white">{fmt(project.assignedAt)}</p></div>
              <div><p className="flex items-center gap-1.5 text-xs font-medium text-gray-500"><CalendarDays size={14} /> Deadline</p><p className="mt-1.5 text-sm font-semibold text-gray-900 dark:text-white">{fmt(project.deadline)}</p></div>
              <div><p className="flex items-center gap-1.5 text-xs font-medium text-gray-500"><Users size={14} /> Team Size</p><p className="mt-1.5 text-sm font-semibold text-gray-900 dark:text-white">{project.members.length} employees</p></div>
              <div>
                <p className="flex items-center gap-1.5 text-xs font-medium text-gray-500">Progress</p>
                <div className="mt-2 flex items-center gap-3">
                  <div className="h-2 w-full flex-1 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800"><div className={`h-full rounded-full ${done ? "bg-green-500" : "bg-gray-800 dark:bg-gray-200"}`} style={{ width: `${project.progress}%` }} /></div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{project.progress}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
              <section className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 p-6 shadow-sm transition-colors">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h2 className="text-base font-semibold text-gray-900 dark:text-white">Project Tasks</h2>
                    <span className="rounded-full bg-gray-100 dark:bg-gray-800 px-2.5 py-0.5 text-xs font-medium text-gray-600 dark:text-gray-400">{completedTasks.length} / {tasks.length} Done</span>
                  </div>
                  {isLead && <button onClick={() => setTaskModal(true)} className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700"><Plus size={14} /> Add Task</button>}
                </div>
                {tasks.length === 0 ? <div className="rounded-lg border border-dashed border-gray-200 py-8 text-center text-sm text-gray-400">No tasks assigned yet.</div> : (
                  <div className="space-y-3">
                    {tasks.map((task) => {
                      const canClose = isLead || task.assignedToId === sampleUser.id;
                      return (
                        <div key={task.id} className="flex items-start justify-between gap-4 rounded-xl border border-gray-100 dark:border-gray-800 p-4 transition hover:border-gray-200 dark:hover:bg-gray-800/50">
                          <div className="flex items-start gap-3">
                            <button onClick={() => canClose && toggleTask(task.id)} disabled={!canClose} className={`mt-0.5 shrink-0 transition ${canClose ? "cursor-pointer hover:scale-110" : "cursor-not-allowed opacity-50"}`}>
                              {task.status === "COMPLETED" ? <CheckCircle2 size={18} className="text-green-500" /> : <Circle size={18} className="text-gray-300 hover:text-gray-400" />}
                            </button>
                            <div><p className={`text-sm font-medium ${task.status === "COMPLETED" ? "text-gray-500 line-through" : "text-gray-900 dark:text-white"}`}>{task.title}</p>
                              <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                                <span className={`font-medium ${task.priority === "URGENT" || task.priority === "HIGH" ? "text-red-600" : ""}`}>{task.priority} Priority</span>
                                {task.dueDate && <span className="flex items-center gap-1"><CalendarDays size={12} />{fmt(task.dueDate)}</span>}
                              </div>
                            </div>
                          </div>
                          {task.assignedTo && <div className="flex shrink-0 items-center gap-2 rounded-full border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-2 py-1"><div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-900 dark:bg-gray-700 text-[10px] font-bold text-white">{task.assignedTo.name.charAt(0)}</div><span className="text-xs font-medium text-gray-700 dark:text-gray-300">{task.assignedTo.name.split(" ")[0]}</span></div>}
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>

              <section className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 p-6 shadow-sm transition-colors">
                <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-white"><MessageSquare size={18} /> Updates & Problems</h2>
                <form onSubmit={addComment} className="mb-6 flex gap-3">
                  <input type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Share an update or report a problem..." className="flex-1 rounded-lg border border-gray-200 dark:border-gray-800 dark:bg-gray-900 dark:text-white px-3 py-2 text-sm outline-none focus:border-gray-800 focus:ring-1 focus:ring-gray-800" />
                  <button type="submit" disabled={!newComment.trim()} className="rounded-lg bg-gray-900 dark:bg-white dark:text-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700 disabled:opacity-50">Post</button>
                </form>
                {comments.length === 0 ? <div className="rounded-lg border border-dashed border-gray-200 py-8 text-center text-sm text-gray-400">No updates reported yet.</div> : (
                  <div className="space-y-4">
                    {comments.map((comment) => (
                      <div key={comment.id} className="flex gap-4 border-b border-gray-100 dark:border-gray-800 pb-4 last:border-0 last:pb-0">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-bold text-gray-600 dark:text-gray-300">{comment.user.name.charAt(0)}</div>
                        <div>
                          <div className="flex items-center gap-2"><p className="text-sm font-medium text-gray-900 dark:text-white">{comment.user.name}</p><span className="text-xs text-gray-400">{fmt(comment.createdAt)}</span></div>
                          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{comment.body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>

            <div className="space-y-8">
              <section className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 p-6 shadow-sm transition-colors">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-base font-semibold text-gray-900 dark:text-white">Team Employees</h2>
                  {isLead && (
                    <button onClick={() => setEmployeesModal(true)} className="flex items-center justify-center rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg></button>
                  )}
                </div>
                <div className="space-y-3">
                  {project.members.map((e) => (
                    <div key={e.id} className="flex items-center gap-3 rounded-lg border border-gray-100 dark:border-gray-800 p-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-900 dark:bg-gray-800 text-sm font-bold text-white">{e.user.name.charAt(0)}</div>
                      <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium text-gray-900 dark:text-white">{e.user.name}</p><p className="truncate text-xs text-gray-500 dark:text-gray-400">{e.user.position}</p></div>
                      {e.role === "MANAGER" || e.role === "ADMIN" ? <span className="shrink-0 rounded bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 text-[10px] font-bold tracking-wider text-blue-700 dark:text-blue-400">LEAD</span> : null}
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
