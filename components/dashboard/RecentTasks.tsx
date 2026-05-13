"use client";

import { motion } from "framer-motion";

import StatusBadge from "@/components/ui/StatusBadge";

const tasks = [
  {
    title: "Build Dashboard UI",
    status: "Completed",
  },
  {
    title: "Fix Authentication",
    status: "In Progress",
  },
  {
    title: "Deploy Backend",
    status: "Pending",
  },
];

export default function RecentTasks() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <h2 className="mb-6 text-2xl font-bold">
        Recent Tasks
      </h2>

      <div className="space-y-4">
        {tasks.map((task, index) => (
          <motion.div
            key={index}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.1,
            }}
            className="flex items-center justify-between rounded-xl border p-4"
          >
            <h3 className="font-medium">
              {task.title}
            </h3>

            <StatusBadge
              status={task.status}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}