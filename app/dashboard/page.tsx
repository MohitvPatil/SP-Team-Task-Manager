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
  Mail,
  Bell,
  CheckCircle2,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────────
interface ProjectEmployee {
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
  members: ProjectEmployee[];
  _count: { tasks: number };
}

interface TeamEmployee {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  role: string;
  imageUrl: string | null;
  position: string;
  department: string;
  availability: string;
  accepted?: boolean; // true = has registered, false = pending invite
}

interface PendingInvite {
  email: string;
  sentAt: string;
}

interface EditRoleFormData {
  role: string;
  position: string;
}

// EmployeeFormData kept for compatibility
interface EmployeeFormData {
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

      {project.members.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {project.members.map((e) => (
            <span
              key={e.id}
              className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
            >
              {e.user.name.split(" ")[0]}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Invite Modal ───────────────────────────────────────────────────────────────
function InviteModal({ onSend, onClose }: { onSend: (email: string) => void; onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400)); // simulate API
    onSend(email.trim());
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white dark:bg-gray-950 dark:border-gray-800 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 px-6 py-4">
          <div>
            <h2 className="text-sm font-bold text-gray-900 dark:text-white">Invite Employee</h2>
            <p className="text-[10px] text-gray-400 mt-0.5">They'll register using their Employee ID + company email</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900">
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handle} className="px-6 py-5 space-y-4">
          <div>
            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-gray-500">Email Address</label>
            <div className="relative">
              <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="employee@company.com"
                className="w-full rounded-xl border border-gray-200 dark:border-gray-800 dark:bg-gray-900 dark:text-white pl-9 pr-4 py-2.5 text-sm outline-none focus:border-gray-800 transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
            </div>
          </div>

          <div className="rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 px-4 py-3 text-xs text-blue-700 dark:text-blue-300 space-y-1">
            <p className="font-semibold">How it works:</p>
            <p>• Employee receives this invite & goes to <span className="font-bold">/register</span></p>
            <p>• They enter their Employee ID + company email + password</p>
            <p>• Profile auto-fills from the employee database</p>
            <p>• You get notified once they accept — then you can set role & position</p>
          </div>

          <div className="flex gap-2 pt-1">
            <button type="button" onClick={onClose} className="flex-1 rounded-xl border border-gray-200 dark:border-gray-700 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
              Cancel
            </button>
            <button disabled={loading || !email.trim()} className="flex-1 rounded-xl bg-gray-900 dark:bg-white dark:text-gray-900 py-2.5 text-sm font-bold text-white hover:bg-gray-800 disabled:opacity-40 transition-all shadow-sm">
              {loading ? "Sending..." : "Send Invite"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Edit Role Modal (only role + position, after employee has accepted) ─────────
function EditRoleModal({
  employee,
  onSave,
  onClose,
}: {
  employee: TeamEmployee;
  onSave: (id: string, data: EditRoleFormData) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<EditRoleFormData>({
    role: employee.role,
    position: employee.position,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white dark:bg-gray-950 dark:border-gray-800 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 px-6 py-4">
          <div>
            <h2 className="text-sm font-bold text-gray-900 dark:text-white">Edit Role & Position</h2>
            <p className="text-[10px] text-gray-400 mt-0.5">{employee.name} · {employee.employeeId}</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900">
            <X size={16} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          <div className="rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 px-4 py-3 space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">From Employee Database (read-only)</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">{employee.name}</p>
            <p className="text-xs text-gray-500">{employee.email} · {employee.department}</p>
          </div>

          <div>
            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-gray-500">Project Position *</label>
            <input
              className="w-full rounded-xl border border-gray-200 dark:border-gray-800 dark:bg-gray-900 dark:text-white px-3 py-2.5 text-sm outline-none focus:border-gray-800 transition-colors"
              value={form.position}
              onChange={(e) => setForm({ ...form, position: e.target.value })}
              placeholder="e.g. Senior Developer"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-gray-500">Role</label>
            <select
              className="w-full rounded-xl border border-gray-200 dark:border-gray-800 dark:bg-gray-900 dark:text-white px-3 py-2.5 text-sm outline-none focus:border-gray-800 transition-colors appearance-none"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="MEMBER">Member</option>
              <option value="MANAGER">Manager</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-gray-100 dark:border-gray-800 px-6 py-4 bg-gray-50/50 dark:bg-gray-900/50">
          <button onClick={onClose} className="rounded-xl px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            Cancel
          </button>
          <button
            onClick={() => onSave(employee.id, form)}
            disabled={!form.position.trim()}
            className="rounded-xl bg-gray-900 dark:bg-white dark:text-gray-900 px-6 py-2 text-sm font-bold text-white disabled:opacity-40 hover:bg-gray-800 transition-all shadow-md"
          >
            Save Changes
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

  // All accepted employees (have registered via invite)
  const [employees, setEmployees] = useState<TeamEmployee[]>(
    sampleTeamMembers.map((m) => ({ ...m, accepted: true }))
  );
  // Pending invites waiting for employee to register
  const [pendingInvites, setPendingInvites] = useState<PendingInvite[]>([]);
  // Notification banner for newly accepted invites
  const [notifications, setNotifications] = useState<string[]>([]);

  // Invite modal
  const [inviteOpen, setInviteOpen] = useState(false);

  // Edit role/position modal (only for accepted employees)
  const [editEmployee, setEditEmployee] = useState<TeamEmployee | null>(null);

  const handleSendInvite = (email: string) => {
    // Check not already a member or pending
    if (employees.some((e) => e.email === email)) {
      import("react-hot-toast").then((t) => t.default.error("This employee is already on the team."));
      setInviteOpen(false);
      return;
    }
    if (pendingInvites.some((p) => p.email === email)) {
      import("react-hot-toast").then((t) => t.default.error("Invite already sent to this email."));
      setInviteOpen(false);
      return;
    }
    // Add to pending list
    setPendingInvites((prev) => [...prev, { email, sentAt: new Date().toISOString() }]);
    import("react-hot-toast").then((t) =>
      t.default.success(`Invite sent to ${email}. They'll register using their Employee ID.`)
    );
    setInviteOpen(false);
  };

  // Simulates an employee accepting (for demo: click on pending card)
  const simulateAccept = (email: string) => {
    // In production: this would be triggered by the signup API
    // Find matching sample member by email
    const member = sampleTeamMembers.find((m) => m.email === email);
    if (member) {
      setEmployees((prev) => [...prev, { ...member, accepted: true }]);
      setPendingInvites((prev) => prev.filter((p) => p.email !== email));
      setNotifications((prev) => [
        `${member.name} (${member.employeeId}) has accepted the invite and joined the team.`,
        ...prev,
      ]);
    } else {
      // Unknown employee — show notification with email
      setPendingInvites((prev) => prev.filter((p) => p.email !== email));
      setNotifications((prev) => [
        `${email} has accepted the invite.`,
        ...prev,
      ]);
    }
  };

  const handleSaveRole = (id: string, data: EditRoleFormData) => {
    setEmployees((prev) =>
      prev.map((e) => (e.id === id ? { ...e, role: data.role, position: data.position } : e))
    );
    setEditEmployee(null);
  };

  const handleDeleteEmployee = (id: string) => {
    if (window.confirm("Remove this employee from the team?"))
      setEmployees((prev) => prev.filter((e) => e.id !== id));
  };

  const planning  = projects.filter((p) => p.state === "PLANNING");
  const ongoing   = projects.filter((p) => p.state === "ONGOING");
  const onHold    = projects.filter((p) => p.state === "ON_HOLD");
  const completed = projects.filter((p) => p.state === "COMPLETED");
  const activeCount = planning.length + ongoing.length + onHold.length;

  const openAdd = () => { setEditTarget(null); setModal("add"); };
  const closeModal = () => { setModal(null); setEditTarget(null); };

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
      {inviteOpen && <InviteModal onSend={handleSendInvite} onClose={() => setInviteOpen(false)} />}
      {editEmployee && (
        <EditRoleModal
          employee={editEmployee}
          onSave={handleSaveRole}
          onClose={() => setEditEmployee(null)}
        />
      )}

      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
        <Navbar />

        <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
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

          <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Active",    value: activeCount,                                           icon: TrendingUp },
              { label: "Completed", value: completed.length,                                      icon: CalendarDays },
              { label: "Employees", value: employees.length,                                      icon: Users },
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

          {/* Section 1: Planning */}
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

          {/* Section 2: Ongoing */}
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
                No ongoing projects.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                {ongoing.map((p) => (
                  <ProjectCard key={p.id} project={p} isLead={isLead} onStatusChange={handleStatusChange} />
                ))}
              </div>
            )}
          </section>

          {/* Section 3: On Hold */}
          {onHold.length > 0 && (
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

          {/* Notification Banner */}
          {notifications.length > 0 && (
            <div className="mb-6 space-y-2">
              {notifications.map((note, i) => (
                <div key={i} className="flex items-center justify-between gap-3 rounded-xl border border-green-200 dark:border-green-900/40 bg-green-50 dark:bg-green-900/20 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-green-600 dark:text-green-400 shrink-0" />
                    <p className="text-sm font-medium text-green-800 dark:text-green-300">{note}</p>
                  </div>
                  <button onClick={() => setNotifications((prev) => prev.filter((_, idx) => idx !== i))} className="text-green-500 hover:text-green-700">
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Section 4: Team Employees */}
          <section className="mb-10">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                Team Employees
                <span className="ml-2 rounded-full bg-gray-100 dark:bg-gray-800 px-2 py-0.5 text-xs font-normal text-gray-500 dark:text-gray-400">
                  {employees.length}
                </span>
                {pendingInvites.length > 0 && (
                  <span className="ml-1 rounded-full bg-yellow-100 dark:bg-yellow-900/30 px-2 py-0.5 text-xs font-normal text-yellow-700 dark:text-yellow-500">
                    {pendingInvites.length} pending
                  </span>
                )}
              </h2>
              {isLead && (
                <button
                  onClick={() => setInviteOpen(true)}
                  className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                >
                  <Mail size={12} /> Invite
                </button>
              )}
            </div>

            {/* Pending Invites */}
            {pendingInvites.length > 0 && (
              <div className="mb-4">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">Awaiting Registration</p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                  {pendingInvites.map((inv) => (
                    <div key={inv.email} className="group relative flex flex-col items-center rounded-xl border border-dashed border-yellow-300 dark:border-yellow-800 bg-yellow-50/50 dark:bg-yellow-900/10 px-4 py-5 text-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-sm font-bold text-yellow-600 dark:text-yellow-400">
                        <Mail size={16} />
                      </div>
                      <p className="mt-2.5 text-[10px] font-semibold text-gray-700 dark:text-gray-300 break-all">{inv.email}</p>
                      <span className="mt-1.5 rounded-full bg-yellow-100 dark:bg-yellow-900/40 px-2 py-0.5 text-[10px] font-medium text-yellow-700 dark:text-yellow-400">
                        Invite Sent
                      </span>
                      <button
                        onClick={() => simulateAccept(inv.email)}
                        title="Simulate Accept (demo)"
                        className="mt-2 text-[10px] text-blue-500 hover:underline"
                      >
                        Simulate Accept ↗
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Accepted Employees */}
            {employees.length > 0 && (
              <div>
                {pendingInvites.length > 0 && (
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">Active Members</p>
                )}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                  {employees.map((e) => (
                    <div
                      key={e.id}
                      className="group relative flex flex-col items-center rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-4 py-5 text-center transition-colors"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-white">
                        {e.name.charAt(0)}
                      </div>
                      <p className="mt-2.5 text-xs font-semibold text-gray-900 dark:text-white">{e.name}</p>
                      <p className="mt-0.5 text-[10px] font-bold text-blue-600 dark:text-blue-400">{e.employeeId}</p>
                      <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">{e.position}</p>
                      <span
                        className={`mt-2 rounded-full px-2 py-0.5 text-xs font-medium ${
                          e.role === "ADMIN"
                            ? "bg-gray-900 text-white"
                            : e.role === "MANAGER"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {e.role}
                      </span>
                      {e.department && (
                        <p className="mt-1 text-xs text-gray-400">{e.department}</p>
                      )}

                      {/* Only role + position editable, only after invite accepted */}
                      {isLead && (
                        <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                          <button
                            onClick={() => setEditEmployee(e)}
                            title="Edit Role & Position"
                            className="rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                          >
                            <Pencil size={11} className="dark:text-gray-300" />
                          </button>
                          <button
                            onClick={() => handleDeleteEmployee(e.id)}
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
              </div>
            )}

            {employees.length === 0 && pendingInvites.length === 0 && (
              <div className="rounded-xl border border-dashed border-gray-200 dark:border-gray-800 py-10 text-center">
                <Bell size={24} className="mx-auto mb-2 text-gray-300 dark:text-gray-700" />
                <p className="text-sm text-gray-400">No team members yet. Invite an employee to get started.</p>
              </div>
            )}
          </section>

          {/* Section 5: Completed Projects */}
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
