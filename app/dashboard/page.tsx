"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Navbar from "@/components/ui/Navbar";
import {
  sampleProjects,
  sampleTeamMembers,
  sampleUser,
  createSampleId,
} from "@/lib/sample-data";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Users,
  CalendarDays,
  Clock,
  TrendingUp,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────────
interface ProjectMember {
  id: string;
  userId: string;
  projectId: string;
  role: string;
  position: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    imageUrl: string | null;
    position: string;
    department: string;
    availability: string;
  };
}

interface Project {
  id: string;
  title: string;
  description: string | null;
  assignedAt: string;
  deadline: string | null;
  completedAt: string | null;
  state: string;
  health: string;
  progress: number;
  ownerId: string;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  owner: { id: string; name: string; email: string; role: string; imageUrl: string | null };
  members: ProjectMember[];
  _count: { tasks: number };
}

interface ProjectFormData {
  title: string;
  description: string;
  assignedAt: string;
  deadline: string;
  memberIds: string[];
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const fmt = (iso: string | null) =>
  iso
    ? new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(
        new Date(iso)
      )
    : "—";

const toInputDate = (iso: string | null) => (iso ? iso.slice(0, 10) : "");

const buildMembers = (projectId: string, userIds: string[]) =>
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

// ── Project Card ──────────────────────────────────────────────────────────────
function ProjectCard({
  project,
  isLead,
  onEdit,
  onDelete,
}: {
  project: Project;
  isLead: boolean;
  onEdit: (p: Project) => void;
  onDelete: (id: string) => void;
}) {
  const done = project.state === "COMPLETED";
  const atRisk = project.health === "At Risk";

  return (
    <div className="group relative flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5">
      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-gray-900">{project.title}</h3>
          {project.description && (
            <p className="mt-0.5 line-clamp-2 text-xs text-gray-500">{project.description}</p>
          )}
        </div>
        <span
          className={`shrink-0 rounded-md px-2 py-0.5 text-xs font-medium ${
            done
              ? "bg-green-50 text-green-700"
              : atRisk
              ? "bg-red-50 text-red-600"
              : "bg-blue-50 text-blue-700"
          }`}
        >
          {done ? "Done" : project.health}
        </span>
      </div>

      {/* Meta */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <Clock size={11} />
          {fmt(project.assignedAt)}
        </span>
        <span className="flex items-center gap-1">
          <CalendarDays size={11} />
          {fmt(project.deadline)}
        </span>
        <span className="flex items-center gap-1">
          <Users size={11} />
          {project.members.length}
        </span>
      </div>

      {/* Progress */}
      <div>
        <div className="mb-1 flex justify-between text-xs text-gray-400">
          <span>Progress</span>
          <span>{project.progress}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
          <div
            className={`h-full rounded-full ${done ? "bg-green-500" : "bg-gray-800"}`}
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      {/* Member chips */}
      {project.members.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {project.members.map((m) => (
            <span
              key={m.id}
              className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
            >
              {m.user.name.split(" ")[0]}
            </span>
          ))}
        </div>
      )}

      {/* Lead actions — appear on hover */}
      {isLead && (
        <div className="absolute right-3 top-3 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={() => onEdit(project)}
            title="Edit"
            className="rounded-md border border-gray-200 bg-white p-1 hover:bg-gray-50"
          >
            <Pencil size={12} />
          </button>
          <button
            onClick={() => onDelete(project.id)}
            title="Delete"
            className="rounded-md border border-red-100 bg-white p-1 hover:bg-red-50"
          >
            <Trash2 size={12} className="text-red-500" />
          </button>
        </div>
      )}
    </div>
  );
}

// ── Project Modal ─────────────────────────────────────────────────────────────
function ProjectModal({
  initial,
  onSave,
  onClose,
}: {
  initial: ProjectFormData | null;
  onSave: (d: ProjectFormData) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<ProjectFormData>(
    initial ?? {
      title: "",
      description: "",
      assignedAt: toInputDate(new Date().toISOString()),
      deadline: "",
      memberIds: [],
    }
  );

  const toggle = (id: string) =>
    setForm((f) => ({
      ...f,
      memberIds: f.memberIds.includes(id) ? f.memberIds.filter((x) => x !== id) : [...f.memberIds, id],
    }));

  const valid = form.title.trim() && form.deadline;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-sm font-semibold text-gray-900">
            {initial ? "Edit Project" : "New Project"}
          </h2>
          <button onClick={onClose} className="rounded-lg p-1 hover:bg-gray-100">
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-4 px-6 py-5">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">Project Name *</label>
            <input
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-800 focus:ring-1 focus:ring-gray-800"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Client Portal Redesign"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">Description</label>
            <textarea
              rows={2}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-800 focus:ring-1 focus:ring-gray-800"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Brief description…"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">Start Date</label>
              <input
                type="date"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-800"
                value={form.assignedAt}
                onChange={(e) => setForm({ ...form, assignedAt: e.target.value })}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">Deadline *</label>
              <input
                type="date"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-800"
                value={form.deadline}
                onChange={(e) => setForm({ ...form, deadline: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-gray-600">Members</label>
            <div className="grid grid-cols-2 gap-1.5">
              {sampleTeamMembers.map((m) => (
                <label
                  key={m.id}
                  className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-xs transition ${
                    form.memberIds.includes(m.id)
                      ? "border-gray-800 bg-gray-50 font-medium"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="accent-gray-900"
                    checked={form.memberIds.includes(m.id)}
                    onChange={() => toggle(m.id)}
                  />
                  <span>
                    {m.name}
                    <span className="block text-gray-400">{m.position}</span>
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 border-t border-gray-100 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => valid && onSave(form)}
            disabled={!valid}
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-40 hover:bg-gray-700"
          >
            {initial ? "Save" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const isLead = sampleUser.role === "ADMIN" || sampleUser.role === "MANAGER";
  const [projects, setProjects] = useState<Project[]>(sampleProjects);
  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [editTarget, setEditTarget] = useState<Project | null>(null);

  const ongoing = projects.filter((p) => p.state === "ONGOING");
  const completed = projects.filter((p) => p.state === "COMPLETED");

  const openAdd = () => { setEditTarget(null); setModal("add"); };
  const openEdit = (p: Project) => { setEditTarget(p); setModal("edit"); };
  const closeModal = () => { setModal(null); setEditTarget(null); };

  const handleDelete = (id: string) => {
    if (window.confirm("Delete this project?"))
      setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSave = (data: ProjectFormData) => {
    if (modal === "add") {
      const id = createSampleId("project");
      const now = new Date().toISOString();
      setProjects((prev) => [
        ...prev,
        {
          id, title: data.title, description: data.description,
          assignedAt: data.assignedAt ? new Date(data.assignedAt).toISOString() : now,
          deadline: data.deadline ? new Date(data.deadline).toISOString() : null,
          completedAt: null, state: "ONGOING", health: "On Track", progress: 0,
          ownerId: sampleUser.id, deletedAt: null, createdAt: now, updatedAt: now,
          owner: sampleUser, members: buildMembers(id, data.memberIds), _count: { tasks: 0 },
        },
      ]);
    } else if (modal === "edit" && editTarget) {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === editTarget.id
            ? {
                ...p, title: data.title, description: data.description,
                assignedAt: data.assignedAt ? new Date(data.assignedAt).toISOString() : p.assignedAt,
                deadline: data.deadline ? new Date(data.deadline).toISOString() : p.deadline,
                members: buildMembers(p.id, data.memberIds), updatedAt: new Date().toISOString(),
              }
            : p
        )
      );
    }
    closeModal();
  };

  const initialForm = editTarget
    ? {
        title: editTarget.title, description: editTarget.description ?? "",
        assignedAt: toInputDate(editTarget.assignedAt), deadline: toInputDate(editTarget.deadline),
        memberIds: editTarget.members.map((m) => m.userId),
      }
    : null;

  return (
    <ProtectedRoute>
      {modal && <ProjectModal initial={initialForm} onSave={handleSave} onClose={closeModal} />}

      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">

          {/* ── Page heading ── */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
              <p className="mt-0.5 text-sm text-gray-500">Overview of team projects and members.</p>
            </div>
            {isLead && (
              <button
                onClick={openAdd}
                className="flex items-center gap-1.5 rounded-lg bg-gray-900 px-3.5 py-2 text-sm font-medium text-white hover:bg-gray-700"
              >
                <Plus size={14} />
                New Project
              </button>
            )}
          </div>

          {/* ── Stat strip ── */}
          <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Ongoing",    value: ongoing.length,                                      icon: TrendingUp },
              { label: "Completed",  value: completed.length,                                    icon: CalendarDays },
              { label: "Members",    value: sampleTeamMembers.length,                            icon: Users },
              { label: "At Risk",    value: ongoing.filter((p) => p.health === "At Risk").length, icon: Clock },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                  <Icon size={15} className="text-gray-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">{label}</p>
                  <p className="text-lg font-semibold text-gray-900">{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Section 1: Ongoing Projects ── */}
          <section className="mb-10">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-800">
                Ongoing Projects
                <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-normal text-gray-500">
                  {ongoing.length}
                </span>
              </h2>
              {isLead && (
                <button
                  onClick={openAdd}
                  className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-800"
                >
                  <Plus size={12} /> Add
                </button>
              )}
            </div>

            {ongoing.length === 0 ? (
              <div className="rounded-xl border border-dashed border-gray-200 py-10 text-center text-sm text-gray-400">
                No ongoing projects.{" "}
                {isLead && (
                  <button onClick={openAdd} className="font-medium underline">
                    Create one.
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                {ongoing.map((p) => (
                  <ProjectCard key={p.id} project={p} isLead={isLead} onEdit={openEdit} onDelete={handleDelete} />
                ))}
              </div>
            )}
          </section>

          {/* ── Section 2: Team Members ── */}
          <section className="mb-10">
            <h2 className="mb-3 text-sm font-semibold text-gray-800">
              Team Members
              <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-normal text-gray-500">
                {sampleTeamMembers.length}
              </span>
            </h2>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {sampleTeamMembers.map((m) => (
                <div
                  key={m.id}
                  className="flex flex-col items-center rounded-xl border border-gray-200 bg-white px-4 py-5 text-center"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-white">
                    {m.name.charAt(0)}
                  </div>
                  <p className="mt-2.5 text-xs font-semibold text-gray-900">{m.name}</p>
                  <p className="mt-0.5 text-xs text-gray-400">{m.position}</p>
                  <span
                    className={`mt-2 rounded-full px-2 py-0.5 text-xs font-medium ${
                      m.role === "ADMIN"
                        ? "bg-gray-900 text-white"
                        : m.role === "MANAGER"
                        ? "bg-blue-50 text-blue-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {m.role}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* ── Section 3: Completed Projects ── */}
          <section>
            <h2 className="mb-3 text-sm font-semibold text-gray-800">
              Completed Projects
              <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-normal text-gray-500">
                {completed.length}
              </span>
            </h2>

            {completed.length === 0 ? (
              <div className="rounded-xl border border-dashed border-gray-200 py-10 text-center text-sm text-gray-400">
                No completed projects yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                {completed.map((p) => (
                  <ProjectCard key={p.id} project={p} isLead={isLead} onEdit={openEdit} onDelete={handleDelete} />
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </ProtectedRoute>
  );
}
