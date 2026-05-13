const files = [
  {
    name: "dashboard-ui.fig",
    size: "2.4 MB",
  },
  {
    name: "api-docs.pdf",
    size: "1.1 MB",
  },
];

export default function RecentFiles() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <h2 className="mb-6 text-2xl font-bold">
        Recent Files
      </h2>

      <div className="space-y-4">
        {files.map((file, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-xl border p-4"
          >
            <div>
              <h3 className="font-semibold">
                {file.name}
              </h3>

              <p className="text-sm text-gray-500">
                {file.size}
              </p>
            </div>

            <button className="rounded-lg border px-4 py-2 text-sm">
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}