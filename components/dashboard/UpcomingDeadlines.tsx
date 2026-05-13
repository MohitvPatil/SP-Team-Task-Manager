const deadlines = [
  {
    title: "Deploy Backend",
    due: "Tomorrow",
  },
  {
    title: "Finish UI Design",
    due: "2 Days Left",
  },
];

export default function UpcomingDeadlines() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <h2 className="mb-6 text-2xl font-bold">
        Upcoming Deadlines
      </h2>

      <div className="space-y-4">
        {deadlines.map((task, index) => (
          <div
            key={index}
            className="rounded-xl border p-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">
                {task.title}
              </h3>

              <span className="text-sm text-red-500">
                {task.due}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}