import Table from "@/components/ui/Table";
import { sampleTasks } from "@/lib/sample-data";

const dateText = (value: string | null) =>
  value
    ? new Intl.DateTimeFormat("en", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(new Date(value))
    : "No date";

export default function TasksTable() {
  const taskData = sampleTasks.map((task) => ({
    task: task.title,
    project: task.project.title,
    priority: task.priority,
    status: task.status.replace("_", " "),
    due: dateText(task.dueDate),
  }));

  return (
    <Table
      headers={[
        "Task",
        "Project",
        "Priority",
        "Status",
        "Due",
      ]}
      data={taskData}
    />
  );
}
