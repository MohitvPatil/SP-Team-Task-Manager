"use client";

import { useState } from "react";

import {
  Pencil,
  Trash2,
} from "lucide-react";

import EditProjectModal from "@/components/projects/EditProjectModal";

interface ProjectCardProps {
  title: string;
  tasks: number;
  progress: number;
}

export default function ProjectCard({
  title,
  tasks,
  progress,
}: ProjectCardProps) {
  const [open, setOpen] =
    useState(false);

  return (
    <>
      <EditProjectModal
        isOpen={open}
        onClose={() => setOpen(false)}
      />

      <div className="rounded-2xl bg-white p-6 shadow">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">
            {title}
          </h2>

          <span className="rounded-full bg-black px-3 py-1 text-xs text-white">
            {tasks} Tasks
          </span>
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