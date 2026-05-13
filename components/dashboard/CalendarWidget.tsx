"use client";

const meetings = [
  {
    title: "Sprint Meeting",
    time: "10:00 AM",
  },
  {
    title: "UI Review",
    time: "2:30 PM",
  },
];

export default function CalendarWidget() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <h2 className="mb-6 text-2xl font-bold">
        Today&apos;s Schedule
      </h2>

      <div className="space-y-4">
        {meetings.map((meeting, index) => (
          <div
            key={index}
            className="rounded-xl border p-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">
                {meeting.title}
              </h3>

              <span className="text-sm text-gray-500">
                {meeting.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}