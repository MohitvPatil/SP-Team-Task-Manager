"use client";

import { useState } from "react";
import Link from "next/link";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Navbar from "@/components/ui/Navbar";
import ProjectModal, {
  ProjectFormData,
  ProjectState,
  ProjectHealth,
} from "@/components/projects/ProjectModal";
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

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  imageUrl: string | null;
  position: string;
  department: string;
  availability: string;
}

interface MemberFormData {
  name: string;
  email: string;
  position: string;
  role: string;
  department: string;
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
  onStatusChange,
}: {
  project: Project;
  isLead: boolean;
  onStatusChange?: (id: string, state: ProjectState, health: ProjectHealth) => void;
}) {
  const done    = project.state === "COMPLETED";
  const onHold  = project.state === "ON_HOLD";
  const planning = project.state === "PLANNING";
  const atRisk  = project.health === "At Risk";

  const badgeClass = done
    ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"
    : onHold
    ? "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-500"
    : planning
    ? "bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
    : atRisk
    ? "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400"
    : "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";

  const badgeLabel = done ? "Done" : onHold ? "On Hold" : project.health;

  return (
    <div className="group relative flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-950 transition-colors">
      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Link href={`/projects/${project.id}`} className="hover:underline">
            <h3 className="truncate text-sm font-semibold text-gray-900 dark:text-white">{project.title}</h3>
          </Link>
          {project.description && (
            <p className="mt-0.5 line-clamp-2 text-xs text-gray-500 dark:text-gray-400">{project.description}</p>
          )}
        </div>
        <span className={`shrink-0 rounded-md px-2 py-0.5 text-xs font-medium ${badgeClass}`}>
          {badgeLabel}
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
            className={`h-full rounded-full ${done ? "bg-green-500" : onHold ? "bg-yellow-400" : planning ? "bg-purple-400" : "bg-gray-800"}`}
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
          {/* Action buttons could go here in the future */}
        </div>
      )}
    </div>
  );
}

// ── Member Modal ──────────────────────────────────────────────────────────────
function MemberModal({
  initial,
  onSave,
  onClose,
}: {
  initial: MemberFormData | null;
  onSave: (d: MemberFormData) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<MemberFormData>(
    initial ?? { name: "", email: "", position: "", role: "MEMBER", department: "" }
  );

  const valid = form.name.trim() && form.email.trim() && form.position.trim();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-sm font-semibold text-gray-900">
            {initial ? "Edit Member" : "Add Member"}
          </h2>
          <button onClick={onClose} className="rounded-lg p-1 hover:bg-gray-100">
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-3 px-6 py-5">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">Name *</label>
            <input
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-800 focus:ring-1 focus:ring-gray-800"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Rahul Sharma"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">Email *</label>
            <input
              type="email"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-800 focus:ring-1 focus:ring-gray-800"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="e.g. rahul@company.com"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">Position *</label>
            <input
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-800 focus:ring-1 focus:ring-gray-800"
              value={form.position}
              onChange={(e) => setForm({ ...form, position: e.target.value })}
              placeholder="e.g. Frontend Engineer"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">Department</label>
            <input
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-800 focus:ring-1 focus:ring-gray-800"
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value })}
              placeholder="e.g. Engineering"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">Role</label>
            <select
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-800 focus:ring-1 focus:ring-gray-800"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="MEMBER">Member</option>
              <option value="MANAGER">Manager</option>
              <option value="ADMIN">Admin</option>
            </select>
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
            {initial ? "Save" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const isLead = sampleUser.role === "ADMIN" || sampleUser.role === "MANAGER";

  // ── Project state ──
  const [projects, setProjects] = useState<Project[]>(sampleProjects);
  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [editTarget, setEditTarget] = useState<Project | null>(null);

  // ── Member state ──
  const [members, setMembers] = useState<TeamMember[]>(sampleTeamMembers);
  const [memberModal, setMemberModal] = useState<"add" | "edit" | null>(null);
  const [editMember, setEditMember] = useState<TeamMember | null>(null);

  const openAddMember = () => { setEditMember(null); setMemberModal("add"); };
  const openEditMember = (m: TeamMember) => { setEditMember(m); setMemberModal("edit"); };
  const closeMemberModal = () => { setMemberModal(null); setEditMember(null); };

  const handleDeleteMember = (id: string) => {
    if (window.confirm("Remove this member from the team?"))
      setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const handleSaveMember = (data: MemberFormData) => {
    if (memberModal === "add") {
      const id = createSampleId("user");
      setMembers((prev) => [
        ...prev,
        { id, name: data.name, email: data.email, role: data.role,
          imageUrl: null, position: data.position, department: data.department,
          availability: "Available" },
      ]);
    } else if (memberModal === "edit" && editMember) {
      setMembers((prev) =>
        prev.map((m) =>
          m.id === editMember.id
            ? { ...m, name: data.name, email: data.email, role: data.role,
                position: data.position, department: data.department }
            : m
        )
      );
    }
    closeMemberModal();
  };

  const memberInitialForm: MemberFormData | null = editMember
    ? { name: editMember.name, email: editMember.email, position: editMember.position,
        role: editMember.role, department: editMember.department }
    : null;

  const planning  = projects.filter((p) => p.state === "PLANNING");
  const ongoing   = projects.filter((p) => p.state === "ONGOING");
  const onHold    = projects.filter((p) => p.state === "ON_HOLD");
  const completed = projects.filter((p) => p.state === "COMPLETED");
  const activeCount = planning.length + ongoing.length + onHold.length;

  const openAdd = () => { setEditTarget(null); setModal("add"); };
  const openEdit = (p: Project) => { setEditTarget(p); setModal("edit"); };
  const closeModal = () => { setModal(null); setEditTarget(null); };

  const handleDelete = (id: string) => {
    if (window.confirm("Delete this project?"))
      setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const handleStatusChange = (id: string, state: ProjectState, health: ProjectHealth) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, state, health, updatedAt: new Date().toISOString() } : p
      )
    );
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
          completedAt: data.state === "COMPLETED" ? now : null,
          state: data.state, health: data.health, progress: 0,
          ownerId: sampleUser.id, deletedAt: null, createdAt: now, updatedAt: now,
          owner: sampleUser, members: [], _count: { tasks: 0 },
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
                state: data.state, health: data.health,
                completedAt: data.state === "COMPLETED" ? (p.completedAt ?? new Date().toISOString()) : null,
                updatedAt: new Date().toISOString(),
              }
            : p
        )
      );
    }
    closeModal();
  };

  const initialForm: ProjectFormData | null = editTarget
    ? {
        title: editTarget.title, description: editTarget.description ?? "",
        assignedAt: toInputDate(editTarget.assignedAt), deadline: toInputDate(editTarget.deadline),
        state: editTarget.state as ProjectState,
        health: editTarget.health as ProjectHealth,
      }
    : null;

return (
    <ProtectedRoute>
      {modal && <ProjectModal initial={initialForm} onSave={handleSave} onClose={closeModal} />}
      {memberModal && <MemberModal initial={memberInitialForm} onSave={handleSaveMember} onClose={closeMemberModal} />}

      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
        <Navbar />

        <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">

          {/* ── Page heading ── */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Dashboard</h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage all your active projects.</p>
            </div>
            {isLead && (
              <button
                onClick={openAdd}
                className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
              >
                <Plus size={14} />
                New Project
              </button>
            )}
          </div>

          {/* ── Stat strip ── */}
          <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Active",    value: activeCount,                                           icon: TrendingUp },
              { label: "Completed", value: completed.length,                                      icon: CalendarDays },
              { label: "Members",   value: members.length,                                        icon: Users },
              { label: "At Risk",   value: projects.filter((p) => p.health === "At Risk").length, icon: Clock },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex items-center gap-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3 transition-colors">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                  <Icon size={15} className="text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Section 1: Planning ── */}
          {(planning.length > 0 || isLead) && (
            <section className="mb-10">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Planning
                  <span className="ml-2 rounded-full bg-purple-100 dark:bg-purple-900/30 px-2 py-0.5 text-xs font-normal text-purple-600 dark:text-purple-400">
                    {planning.length}
                  </span>
                </h2>
                {isLead && (
                  <button onClick={openAdd} className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-800">
                    <Plus size={12} /> Add
                  </button>
                )}
              </div>
              {planning.length === 0 ? (
                <div className="rounded-xl border border-dashed border-gray-200 dark:border-gray-800 py-6 text-center text-sm text-gray-400">
                  No projects in planning.
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {planning.map((p) => (
                    <ProjectCard key={p.id} project={p} isLead={isLead} onStatusChange={handleStatusChange} />
                  ))}
                </div>
              )}
            </section>
          )}

          {/* ── Section 2: Ongoing ── */}
          <section className="mb-10">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                Ongoing Projects
                <span className="ml-2 rounded-full bg-blue-100 dark:bg-blue-900/30 px-2 py-0.5 text-xs font-normal text-blue-600 dark:text-blue-400">
                  {ongoing.length}
                </span>
              </h2>
              {isLead && (
                <button onClick={openAdd} className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-800">
                  <Plus size={12} /> Add
                </button>
              )}
            </div>
            {ongoing.length === 0 ? (
              <div className="rounded-xl border border-dashed border-gray-200 dark:border-gray-800 py-6 text-center text-sm text-gray-400">
                No ongoing projects.{" "}
                {isLead && (
                  <button onClick={openAdd} className="font-medium underline">Create one.</button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                {ongoing.map((p) => (
                  <ProjectCard key={p.id} project={p} isLead={isLead} onStatusChange={handleStatusChange} />
                ))}
              </div>
            )}
          </section>

          {/* ── Section 3: On Hold ── */}
          {(onHold.length > 0) && (
            <section className="mb-10">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  On Hold
                  <span className="ml-2 rounded-full bg-yellow-100 dark:bg-yellow-900/30 px-2 py-0.5 text-xs font-normal text-yellow-700 dark:text-yellow-500">
                    {onHold.length}
                  </span>
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                {onHold.map((p) => (
                  <ProjectCard key={p.id} project={p} isLead={isLead} onStatusChange={handleStatusChange} />
                ))}
              </div>
            </section>
          )}

          {/* ── Section 2: Team Members ── */}
          <section className="mb-10">
            <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Team Members
                  <span className="ml-2 rounded-full bg-gray-100 dark:bg-gray-800 px-2 py-0.5 text-xs font-normal text-gray-500 dark:text-gray-400">
                    {members.length}
                  </span>
                </h2>
              {isLead && (
                <button
                  onClick={openAddMember}
                  className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-800"
                >
                  <Plus size={12} /> Add
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {members.map((m) => (
                <div
                  key={m.id}
                  className="group relative flex flex-col items-center rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-4 py-5 text-center transition-colors"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-white">
                    {m.name.charAt(0)}
                  </div>
                  <p className="mt-2.5 text-xs font-semibold text-gray-900 dark:text-white">{m.name}</p>
                  <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">{m.position}</p>
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
                  {m.department && (
                    <p className="mt-1 text-xs text-gray-400">{m.department}</p>
                  )}

                  {/* Lead actions — appear on hover */}
                  {isLead && (
                    <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      <button
                        onClick={() => openEditMember(m)}
                        title="Edit"
                        className="rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <Pencil size={11} className="dark:text-gray-300" />
                      </button>
                      <button
                        onClick={() => handleDeleteMember(m.id)}
                        title="Remove"
                        className="rounded-md border border-red-100 dark:border-red-900/30 bg-white dark:bg-red-950/20 p-1 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                      >
                        <Trash2 size={11} className="text-red-500 dark:text-red-400" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* ── Section 3: Completed Projects ── */}
          <section>
            <h2 className="mb-3 text-sm font-semibold text-gray-800 dark:text-gray-200">
              Completed Projects
              <span className="ml-2 rounded-full bg-gray-100 dark:bg-gray-800 px-2 py-0.5 text-xs font-normal text-gray-500 dark:text-gray-400">
                {completed.length}
              </span>
            </h2>

            {completed.length === 0 ? (
              <div className="rounded-xl border border-dashed border-gray-200 dark:border-gray-800 py-10 text-center text-sm text-gray-400">
                No completed projects yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                {completed.map((p) => (
                  <ProjectCard key={p.id} project={p} isLead={isLead} onStatusChange={handleStatusChange} />
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </ProtectedRoute>
  );
}
