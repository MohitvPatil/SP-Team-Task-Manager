"use client";

import { useEffect, useState } from "react";

import { getTasks } from "@/services/taskService";

export default function useTasks() {
  const [tasks, setTasks] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchTasks =
      async () => {
        try {
          const data =
            await getTasks();

          setTasks(data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

    fetchTasks();
  }, []);

  return {
    tasks,
    loading,
  };
}