"use client";

import Link from "next/link";
import { X } from "lucide-react";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileSidebar({
  isOpen,
  onClose,
}: MobileSidebarProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 lg:hidden">
      <div className="h-full w-72 bg-white p-6 shadow-xl">
        <div className="mb-10 flex items-center justify-between">
          <h1 className="text-3xl font-bold">
            TaskFlow
          </h1>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <nav className="space-y-6">
          <Link
            href="/dashboard"
            className="block"
          >
            Dashboard
          </Link>

          <Link
            href="/projects"
            className="block"
          >
            Projects
          </Link>

          <Link
            href="/tasks"
            className="block"
          >
            Tasks
          </Link>

          <Link
            href="/deadlines"
            className="block"
          >
            Deadlines
          </Link>

          <Link
            href="/profile"
            className="block"
          >
            Profile
          </Link>

          <Link
            href="/settings"
            className="block"
          >
            Settings
          </Link>
        </nav>
      </div>
    </div>
  );
}
