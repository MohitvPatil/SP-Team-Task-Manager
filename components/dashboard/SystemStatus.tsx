const systems = [
  {
    name: "API Server",
    status: "Online",
  },
  {
    name: "Database",
    status: "Online",
  },
  {
    name: "Socket Server",
    status: "Online",
  },
];

export default function SystemStatus() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <h2 className="mb-6 text-2xl font-bold">
        System Status
      </h2>

      <div className="space-y-4">
        {systems.map((system, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-xl border p-4"
          >
            <h3 className="font-medium">
              {system.name}
            </h3>

            <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-600">
              {system.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}