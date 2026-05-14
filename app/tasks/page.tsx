"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Navbar from "@/components/ui/Navbar";
import { sampleTasks, sampleProjects } from "@/lib/sample-data";
import { CheckCircle2, Circle, Clock, MoreHorizontal } from "lucide-react";
import Link from "next/link";

type TaskStatus = "TODO" | "IN_PROGRESS" | "REVIEW" | "COMPLETED";

const COLUMNS: { id: TaskStatus; title: string }[] = [
  { id: "TODO", title: "To Do" },
  { id: "IN_PROGRESS", title: "In Progress" },
  { id: "REVIEW", title: "Review" },
  { id: "COMPLETED", title: "Completed" },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState(sampleTasks);

  const moveTask = (taskId: string, newStatus: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus as any } : t))
    );
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
        <Navbar />

        <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">All Tasks</h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Drag or click to move tasks across the board.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {COLUMNS.map((col) => {
              const colTasks = tasks.filter((t) => t.status === col.id);
              
              return (
                <div key={col.id} className="flex flex-col rounded-2xl bg-gray-100/50 p-4 dark:bg-gray-900/50">
                  <div className="mb-4 flex items-center justify-between px-1">
                    <h2 className="text-sm font-semibold text-gray-900 dark:text-white">{col.title}</h2>
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-[10px] font-bold text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                      {colTasks.length}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col gap-3">
                    {colTasks.map((task) => {
                      const project = sampleProjects.find(p => p.id === task.projectId);
                      
                      return (
                        <div
                          key={task.id}
                          className="group relative cursor-pointer rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-gray-300 hover:shadow dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-700"
                        >
                          <div className="mb-2">
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">
                              {task.title}
                            </h3>
                          </div>
                          
                          {project && (
                            <Link href={`/projects/${project.id}`} className="mb-3 block text-xs text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 truncate">
                              {project.title}
                            </Link>
                          )}

                          <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800/50 pt-3 mt-1">
                            <div className="flex flex-wrap gap-1.5">
                              {(() => {
                                const options: string[] = [];
                                if (col.id === "TODO") options.push("IN_PROGRESS");
                                else if (col.id === "IN_PROGRESS") options.push("REVIEW");
                                else if (col.id === "REVIEW") options.push("COMPLETED");
                                else if (col.id === "COMPLETED") options.push("IN_PROGRESS", "REVIEW");

                                return options.map(statusId => {
                                  const targetCol = COLUMNS.find(c => c.id === statusId);
                                  if (!targetCol) return null;
                                  return (
                                    <button
                                      key={statusId}
                                      onClick={() => moveTask(task.id, statusId as any)}
                                      className="rounded-md border border-gray-200 dark:border-gray-800 px-2 py-0.5 text-[10px] font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all active:scale-95"
                                    >
                                      {targetCol.title}
                                    </button>
                                  );
                                });
                              })()}
                            </div>
                            
                            {task.assignedTo && (
                              <div className="flex items-center gap-2 pr-1">
                                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-900 dark:bg-gray-800 text-[9px] font-bold text-white">
                                  {task.assignedTo.name.charAt(0)}
                                </div>
                                <span className="truncate text-[10px] font-medium text-gray-500 dark:text-gray-400 max-w-[100px]">
                                  {task.assignedTo.name}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}