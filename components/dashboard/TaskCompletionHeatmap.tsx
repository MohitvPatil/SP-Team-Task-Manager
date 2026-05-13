const days = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
];

export default function TaskCompletionHeatmap() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <h2 className="mb-6 text-2xl font-bold">
        Weekly Activity
      </h2>

      <div className="grid grid-cols-7 gap-4">
        {days.map((day, index) => (
          <div
            key={index}
            className="flex flex-col items-center"
          >
            <div className="mb-2 text-sm text-gray-500">
              {day}
            </div>

            <div className="h-16 w-full rounded-xl bg-black opacity-80" />
          </div>
        ))}
      </div>
    </div>
  );
}