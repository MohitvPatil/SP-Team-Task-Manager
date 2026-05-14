"use client";

import { useState, useEffect } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Navbar from "@/components/ui/Navbar";
import { sampleTasks, sampleProjects } from "@/lib/sample-data";
import { CalendarDays, Clock, MoreHorizontal, AlertCircle } from "lucide-react";
import Link from "next/link";

type DeadlineItem = {
  id: string;
  title: string;
  date: string;
  type: "PROJECT" | "TASK";
  projectId?: string;
  projectTitle?: string;
  status?: string;
  health?: string;
  assignedToName?: string;
};

const dateText = (value: string | null) =>
  value
    ? new Intl.DateTimeFormat("en", {
        month: "short",
        day: "numeric",
      }).format(new Date(value))
    : "No date";

export default function DeadlinesPage() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

  if (!mounted) return null;

  // Collect all items with deadlines
  const allItems: DeadlineItem[] = [
    ...sampleProjects.map((p) => ({
      id: p.id,
      title: p.title,
      date: p.deadline || "",
      type: "PROJECT" as const,
      health: p.health,
    })),
    ...sampleTasks
      .filter((t) => t.dueDate)
      .map((t) => ({
        id: t.id,
        title: t.title,
        date: t.dueDate || "",
        type: "TASK" as const,
        projectId: t.projectId,
        projectTitle: t.project.title,
        status: t.status,
        assignedToName: t.assignedTo?.name,
      })),
  ].filter(item => item.date);

  const categorize = (dateStr: string) => {
    const d = new Date(dateStr);
    const itemDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());

    if (itemDate < today) return "OVERDUE";
    if (itemDate.getTime() === today.getTime()) return "TODAY";
    if (itemDate <= nextWeek) return "THIS_WEEK";
    return "UPCOMING";
  };

  const COLUMNS = [
    { id: "OVERDUE", title: "Overdue", color: "text-red-600 dark:text-red-400" },
    { id: "TODAY", title: "Today", color: "text-blue-600 dark:text-blue-400" },
    { id: "THIS_WEEK", title: "This Week", color: "text-gray-900 dark:text-white" },
    { id: "UPCOMING", title: "Upcoming", color: "text-gray-500 dark:text-gray-400" },
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
        <Navbar />

        <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Deadlines</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Track upcoming project and task due dates.</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {COLUMNS.map((col) => {
              const colItems = allItems
                .filter((item) => categorize(item.date) === col.id)
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

              return (
                <div key={col.id} className="flex flex-col rounded-2xl bg-gray-100/50 p-4 dark:bg-gray-900/50">
                  <div className="mb-4 flex items-center justify-between px-1">
                    <h2 className={`text-sm font-semibold ${col.color}`}>{col.title}</h2>
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-[10px] font-bold text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                      {colItems.length}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col gap-3">
                    {colItems.map((item) => (
                      <div
                        key={item.id}
                        className="group relative rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-gray-300 hover:shadow dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-700"
                      >
                        <div className="mb-2 flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            {item.type === "PROJECT" ? (
                              <CalendarDays size={14} className="text-purple-500" />
                            ) : (
                              <Clock size={14} className="text-blue-500" />
                            )}
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
                              {item.title}
                            </h3>
                          </div>
                          {col.id === "OVERDUE" && (
                            <AlertCircle size={14} className="text-red-500 shrink-0" />
                          )}
                        </div>

                        {item.type === "TASK" ? (
                          <div className="mb-3 space-y-1">
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                              Task in <span className="font-medium text-gray-700 dark:text-gray-200">{item.projectTitle}</span>
                            </p>
                            {item.assignedToName && (
                              <p className="text-[10px] font-medium text-gray-400 dark:text-gray-500 flex items-center gap-1">
                                <span className="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                                {item.assignedToName}
                              </p>
                            )}
                          </div>
                        ) : (
                          <p className="mb-3 text-xs text-gray-500 dark:text-gray-400">
                            Project Deadline
                          </p>
                        )}

                        <div className="flex items-center justify-between border-t border-gray-50 dark:border-gray-800 pt-3">
                          <span className="text-[11px] font-semibold text-gray-900 dark:text-white">
                            {dateText(item.date)}
                          </span>
                          <span className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${
                            item.type === "PROJECT" 
                              ? "bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                              : "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                          }`}>
                            {item.type}
                          </span>
                        </div>
                        
                        {item.type === "PROJECT" ? (
                          <Link href={`/projects/${item.id}`} className="absolute inset-0 z-0" />
                        ) : (
                          item.projectId && <Link href={`/projects/${item.projectId}`} className="absolute inset-0 z-0" />
                        )}
                      </div>
                    ))}

                    {colItems.length === 0 && (
                      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 py-10 dark:border-gray-800">
                        <p className="text-[10px] text-gray-400">Clear</p>
                      </div>
                    )}
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
