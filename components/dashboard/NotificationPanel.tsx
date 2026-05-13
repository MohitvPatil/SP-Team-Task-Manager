const notifications = [
  "Rahul completed API Integration",
  "New task assigned to you",
  "Project deadline updated",
];

export default function NotificationPanel() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <h2 className="mb-6 text-2xl font-bold">
        Notifications
      </h2>

      <div className="space-y-4">
        {notifications.map(
          (notification, index) => (
            <div
              key={index}
              className="rounded-xl border p-4"
            >
              <p>{notification}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}