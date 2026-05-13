import { formatDate } from "@/utils/formatDate";

const activities = [
  {
    action: "Task Completed",
    user: "Mohit",
    date: new Date(),
  },
  {
    action: "Project Created",
    user: "Admin",
    date: new Date(),
  },
];

export default function ActivityTimeline() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <h2 className="mb-6 text-2xl font-bold">
        Activity Timeline
      </h2>

      <div className="space-y-6">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-start gap-4"
          >
            <div className="mt-1 h-3 w-3 rounded-full bg-black" />

            <div>
              <h3 className="font-semibold">
                {activity.action}
              </h3>

              <p className="text-sm text-gray-500">
                By {activity.user}
              </p>

              <p className="mt-1 text-xs text-gray-400">
                {formatDate(activity.date)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}