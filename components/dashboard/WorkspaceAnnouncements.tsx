const announcements = [
  {
    title:
      "New Workspace Features Released",
    date: "Today",
  },
  {
    title:
      "Server Maintenance Scheduled",
    date: "Tomorrow",
  },
];

export default function WorkspaceAnnouncements() {
  return (
    <div className="rounded-2xl bg-black p-6 text-white shadow">
      <h2 className="mb-6 text-2xl font-bold">
        Announcements
      </h2>

      <div className="space-y-4">
        {announcements.map(
          (
            announcement,
            index
          ) => (
            <div
              key={index}
              className="rounded-xl bg-white/10 p-4"
            >
              <h3 className="font-semibold">
                {
                  announcement.title
                }
              </h3>

              <p className="mt-2 text-sm text-gray-300">
                {
                  announcement.date
                }
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}