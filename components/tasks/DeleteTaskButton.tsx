"use client";

import { Trash2 } from "lucide-react";

import toast from "react-hot-toast";

interface DeleteTaskButtonProps {
  taskId: string;
}

export default function DeleteTaskButton({
  taskId,
}: DeleteTaskButtonProps) {
  const handleDelete = async () => {
    toast.success(
      "Task deleted successfully"
    );
  };

  return (
    <button
      onClick={handleDelete}
      className="rounded-lg border border-red-200 p-2 text-red-500"
    >
      <Trash2 size={16} />
    </button>
  );
}