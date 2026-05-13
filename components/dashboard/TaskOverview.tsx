const overview = [
  {
    label: "Todo",
    value: 12,
  },
  {
    label: "In Progress",
    value: 8,
  },
  {
    label: "Completed",
    value: 24,
  },
];

export default function TaskOverview() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <h2 className="mb-6 text-2xl font-bold">
        Task Overview
      </h2>

      <div className="space-y-6">
        {overview.map((item, index) => (
          <div key={index}>
            <div className="mb-2 flex items-center justify-between">
              <h3>{item.label}</h3>

              <span>{item.value}</span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-black"
                style={{
                  width: `${item.value * 3}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}