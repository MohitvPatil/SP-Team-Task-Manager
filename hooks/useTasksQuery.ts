"use client";

import {
  useQuery,
} from "@tanstack/react-query";

import { getTasks } from "@/services/taskService";

export default function useTasksQuery() {
  return useQuery({
    queryKey: ["tasks"],

    queryFn: getTasks,
  });
}