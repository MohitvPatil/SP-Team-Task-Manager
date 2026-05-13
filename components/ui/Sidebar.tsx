import Link from "next/link";

import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Settings,
  User,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="hidden min-h-screen w-64 border-r bg-white p-6 lg:block">
      <h1 className="mb-10 text-3xl font-bold">
        TaskFlow
      </h1>

      <nav className="space-y-6">
        <Link
          href="/dashboard"
          className="flex items-center gap-3"
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </Link>

        <Link
          href="/projects"
          className="flex items-center gap-3"
        >
          <FolderKanban size={20} />
          <span>Projects</span>
        </Link>

        <Link
          href="/tasks"
          className="flex items-center gap-3"
        >
          <CheckSquare size={20} />
          <span>Tasks</span>
        </Link>

        <Link
          href="/profile"
          className="flex items-center gap-3"
        >
          <User size={20} />
          <span>Profile</span>
        </Link>

        <Link
          href="/settings"
          className="flex items-center gap-3"
        >
          <Settings size={20} />
          <span>Settings</span>
        </Link>
      </nav>
    </aside>
  );
}