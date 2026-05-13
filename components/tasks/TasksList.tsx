"use client";

import TaskCard from "@/components/kanban/TaskCard";

import Loader from "@/components/ui/Loader";

import useTasksQuery from "@/hooks/useTasksQuery";

export default function TasksList() {
  const {
    data,
    isLoading,
  } = useTasksQuery();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {data?.map((task: any) => (
        <TaskCard
          key={task.id}
          title={task.title}
          priority={task.priority}
        />
      ))}
    </div>
  );
}