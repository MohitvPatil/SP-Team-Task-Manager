import {
  FolderPlus,
  Plus,
  Users,
} from "lucide-react";

export default function QuickActions() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <h2 className="mb-6 text-2xl font-bold">
        Quick Actions
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <button className="flex items-center justify-center gap-2 rounded-xl border p-4 hover:bg-gray-100">
          <Plus size={18} />

          Add Task
        </button>

        <button className="flex items-center justify-center gap-2 rounded-xl border p-4 hover:bg-gray-100">
          <FolderPlus size={18} />

          Create Project
        </button>

        <button className="flex items-center justify-center gap-2 rounded-xl border p-4 hover:bg-gray-100">
          <Users size={18} />

          Add Member
        </button>
      </div>
    </div>
  );
}