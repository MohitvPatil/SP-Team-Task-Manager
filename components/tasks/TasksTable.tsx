import Table from "@/components/ui/Table";

const taskData = [
  {
    title: "Build Dashboard",
    priority: "HIGH",
    status: "Completed",
  },
  {
    title: "Fix Backend",
    priority: "MEDIUM",
    status: "Pending",
  },
];

export default function TasksTable() {
  return (
    <Table
      headers={[
        "Task",
        "Priority",
        "Status",
      ]}
      data={taskData}
    />
  );
}
