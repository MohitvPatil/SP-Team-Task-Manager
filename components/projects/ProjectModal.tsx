import { useState } from "react";
import { X } from "lucide-react";
import { sampleTeamMembers } from "@/lib/sample-data";

export type ProjectState = "PLANNING" | "ONGOING" | "ON_HOLD" | "COMPLETED";
export type ProjectHealth = "On Track" | "At Risk" | "Completed";

export const STATE_OPTIONS: { value: ProjectState; label: string }[] = [
  { value: "PLANNING",  label: "Planning"   },
  { value: "ONGOING",   label: "Ongoing"    },
  { value: "ON_HOLD",   label: "On Hold"    },
  { value: "COMPLETED", label: "Completed"  },
];

export const HEALTH_OPTIONS: { value: ProjectHealth; label: string }[] = [
  { value: "On Track",  label: "On Track"  },
  { value: "At Risk",   label: "At Risk"   },
  { value: "Completed", label: "Completed" },
];

export interface ProjectFormData {
  title: string;
  description: string;
  assignedAt: string;
  deadline: string;
  state: ProjectState;
  health: ProjectHealth;
}

const toInputDate = (iso: string | null) => (iso ? iso.slice(0, 10) : "");

export default function ProjectModal({
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
      state: "PLANNING",
      health: "On Track",
    }
  );

  const valid = form.title.trim() && form.deadline;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-sm font-semibold text-gray-900">
            {initial ? "Edit Project" : "New Project"}
          </h2>
          <button onClick={onClose} className="rounded-lg p-1 hover:bg-gray-100">
            <X size={16} />
          </button>
        </div>

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

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">Status</label>
              <select
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-800"
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value as ProjectState })}
              >
                {STATE_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">Health</label>
              <select
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-800"
                value={form.health}
                onChange={(e) => setForm({ ...form, health: e.target.value as ProjectHealth })}
              >
                {HEALTH_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 border-t border-gray-100 px-6 py-4">
          <button onClick={onClose} className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100">
            Cancel
          </button>
          <button
            onClick={() => onSave(form)}
            disabled={!valid}
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 disabled:opacity-50"
          >
            Save Project
          </button>
        </div>
      </div>
    </div>
  );
}
