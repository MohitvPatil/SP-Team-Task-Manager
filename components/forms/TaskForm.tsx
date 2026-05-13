"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { createTask } from "@/services/taskService";

export default function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectId, setProjectId] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    try {
      await createTask({ title, description, priority, projectId });
      toast.success("Task created");
      setTitle("");
      setDescription("");
    } catch {
      toast.error("Could not create task");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input value={title} onChange={(event) => setTitle(event.target.value)} required minLength={2} placeholder="Task title" className="w-full rounded-lg border border-slate-300 px-3 py-2" />
      <input value={projectId} onChange={(event) => setProjectId(event.target.value)} required placeholder="Project ID" className="w-full rounded-lg border border-slate-300 px-3 py-2" />
      <select value={priority} onChange={(event) => setPriority(event.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2">
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
        <option value="URGENT">Urgent</option>
      </select>
      <textarea value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Description" className="min-h-28 w-full rounded-lg border border-slate-300 px-3 py-2" />
      <button disabled={submitting} className="rounded-lg bg-slate-950 px-4 py-2 text-white disabled:opacity-60">
        {submitting ? "Creating..." : "Create task"}
      </button>
    </form>
  );
}
