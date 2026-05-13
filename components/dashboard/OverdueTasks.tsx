const overdueTasks = [
  "Fix payment integration",
  "Complete dashboard UI",
  "Deploy API server",
];

export default function OverdueTasks() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <h2 className="mb-6 text-2xl font-bold">
        Overdue Tasks
      </h2>

      <div className="space-y-4">
        {overdueTasks.map((task, index) => (
          <div
            key={index}
            className="rounded-xl border border-red-200 bg-red-50 p-4"
          >
            <p className="font-medium text-red-600">
              {task}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}