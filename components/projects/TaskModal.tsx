import { useState } from "react";
import { X } from "lucide-react";
import { sampleTeamMembers } from "@/lib/sample-data";

export interface TaskFormData {
  title: string;
  description: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  dueDate: string;
  assignedToId: string | null;
}

const toInputDate = (iso: string | null) => (iso ? iso.slice(0, 10) : "");

export default function TaskModal({
  onSave,
  onClose,
}: {
  onSave: (data: TaskFormData) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<TaskFormData>({
    title: "",
    description: "",
    priority: "MEDIUM",
    dueDate: toInputDate(new Date().toISOString()),
    assignedToId: null,
  });

  const valid = form.title.trim().length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-sm font-semibold text-gray-900">Add New Task</h2>
          <button onClick={onClose} className="rounded-lg p-1 hover:bg-gray-100">
            <X size={16} />
          </button>
        </div>

        <div className="space-y-4 px-6 py-5">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">Task Title *</label>
            <input
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-800 focus:ring-1 focus:ring-gray-800"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Design homepage wireframes"
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
              <label className="mb-1 block text-xs font-medium text-gray-600">Priority</label>
              <select
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-800"
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value as any })}
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="URGENT">Urgent</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">Due Date</label>
              <input
                type="date"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-800"
                value={form.dueDate}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">Assign To</label>
            <select
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-800"
              value={form.assignedToId || ""}
              onChange={(e) => setForm({ ...form, assignedToId: e.target.value || null })}
            >
              <option value="">-- Unassigned --</option>
              {sampleTeamMembers.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.role})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-gray-100 px-6 py-4">
          <button onClick={onClose} className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100">
            Cancel
          </button>
          <button
            onClick={() => onSave(form)}
            disabled={!valid}
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 disabled:opacity-50"
          >
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
}
