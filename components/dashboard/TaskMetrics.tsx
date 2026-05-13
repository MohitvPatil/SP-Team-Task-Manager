const metrics = [
  {
    label:
      "Average Completion Time",
    value: "2.4 Days",
  },
  {
    label:
      "Completion Rate",
    value: "89%",
  },
  {
    label:
      "Overdue Tasks",
    value: "4",
  },
];

export default function TaskMetrics() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <h2 className="mb-6 text-2xl font-bold">
        Task Metrics
      </h2>

      <div className="space-y-5">
        {metrics.map(
          (metric, index) => (
            <div
              key={index}
              className="rounded-xl border p-4"
            >
              <p className="text-sm text-gray-500">
                {metric.label}
              </p>

              <h3 className="mt-2 text-3xl font-bold">
                {metric.value}
              </h3>
            </div>
          )
        )}
      </div>
    </div>
  );
}