"use client";

import { useState, useEffect } from "react";
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


// ── Page ──────────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const isLead = sampleUser.role === "ADMIN" || sampleUser.role === "MANAGER";

  const [projects, setProjects] = useState<Project[]>(sampleProjects);
  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [editTarget, setEditTarget] = useState<Project | null>(null);

  const [employees, setEmployees] = useState<TeamEmployee[]>([]);

  useEffect(() => {
    fetch("/api/employees")
      .then((res) => res.json())
      .then((data) => {
        const mapped = data.map((e: any) => ({
          id: e.id,
          employeeId: e.employeeId,
          name: e.name,
          email: e.email,
          role: e.role,
          imageUrl: e.imageUrl,
          position: e.position,
          department: e.department,
          availability: "100%", // default
          accepted: true,
        }));
        setEmployees(mapped);
      });
  }, []);

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


      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
        <Navbar />

        <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Dashboard</h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage all your active projects.</p>
            </div>
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


          {/* Section 4: Team Employees */}
          <section className="mb-10">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                Team Employees
                <span className="ml-2 rounded-full bg-gray-100 dark:bg-gray-800 px-2 py-0.5 text-xs font-normal text-gray-500 dark:text-gray-400">
                  {employees.length}
                </span>
              </h2>
            </div>


            {/* Accepted Employees */}
            {employees.length > 0 && (
              <div>
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

                    </div>
                  ))}
                </div>
              </div>
            )}

            {employees.length === 0 && (
              <div className="rounded-xl border border-dashed border-gray-200 dark:border-gray-800 py-10 text-center">
                <Bell size={24} className="mx-auto mb-2 text-gray-300 dark:text-gray-700" />
                <p className="text-sm text-gray-400">No team members yet.</p>
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
