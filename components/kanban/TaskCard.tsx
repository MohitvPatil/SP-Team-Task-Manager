"use client";

import { useState } from "react";

import {
  Pencil,
  Trash2,
} from "lucide-react";

import { getTaskColor } from "@/utils/getTaskColor";

import EditTaskModal from "@/components/tasks/EditTaskModal";

interface TaskCardProps {
  title: string;
  priority: string;
}

export default function TaskCard({
  title,
  priority,
}: TaskCardProps) {
  const [open, setOpen] =
    useState(false);

  return (
    <>
      <EditTaskModal
        isOpen={open}
        onClose={() => setOpen(false)}
      />

      <div className="rounded-2xl bg-white p-4 shadow">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">
            {title}
          </h2>

          <div
            className={`h-3 w-3 rounded-full ${getTaskColor(
              priority
            )}`}
          />
        </div>

        <p className="mt-4 text-sm text-gray-500">
          Task Priority: {priority}
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