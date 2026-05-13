"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { createProject } from "@/services/projectService";

export default function ProjectForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    try {
      await createProject({ title, description });
      toast.success("Project created");
      setTitle("");
      setDescription("");
    } catch {
      toast.error("Could not create project");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
        minLength={2}
        placeholder="Project title"
        className="w-full rounded-lg border border-slate-300 px-3 py-2"
      />
      <textarea
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Description"
        className="min-h-28 w-full rounded-lg border border-slate-300 px-3 py-2"
      />
      <button disabled={submitting} className="rounded-lg bg-slate-950 px-4 py-2 text-white disabled:opacity-60">
        {submitting ? "Creating..." : "Create project"}
      </button>
    </form>
  );
}
