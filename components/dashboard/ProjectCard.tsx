"use client";

import Link from "next/link";
import { useState } from "react";

import {
  Pencil,
  Trash2,
} from "lucide-react";

import EditProjectModal from "@/components/projects/EditProjectModal";

interface ProjectCardProps {
  id?: string;
  title: string;
  tasks: number;
  progress: number;
  assignedAt?: string;
  deadline?: string;
  memberCount?: number;
  health?: string;
  state?: string;
}

export default function ProjectCard({
  id,
  title,
  tasks,
  progress,
  assignedAt,
  deadline,
  memberCount,
  health,
  state,
}: ProjectCardProps) {
  const [open, setOpen] =
    useState(false);

  return (
    <>
      <EditProjectModal
        isOpen={open}
        onClose={() => setOpen(false)}
      />

      <div className="rounded-lg bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          {id ? (
            <Link href={`/projects/${id}`} className="text-xl font-bold hover:underline">
              {title}
            </Link>
          ) : (
            <h2 className="text-xl font-bold">
              {title}
            </h2>
          )}

          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold">
            {state || health || "Project"}
          </span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-gray-600">
          <span>Assigned: {assignedAt || "No date"}</span>
          <span>Deadline: {deadline || "No date"}</span>
          <span>{tasks} Tasks</span>
          <span>{memberCount ?? 0} Members</span>
        </div>

        <div className="mt-6 h-3 overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-black"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <p className="mt-3 text-sm text-gray-500">
          {progress}% Completed
        </p>

        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={() =>
              setOpen(true)
            }
            className="rounded-lg border p-2"
          >
            <Pencil size={16} />
          </button>

          <button className="rounded-lg border border-red-200 p-2 text-red-500">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </>
  );
}
