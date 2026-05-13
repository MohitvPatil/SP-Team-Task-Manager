const backups = [
  {
    date:
      "12 May 2026",
    status:
      "Completed",
  },
  {
    date:
      "10 May 2026",
    status:
      "Completed",
  },
];

export default function WorkspaceBackups() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <h2 className="mb-6 text-2xl font-bold">
        Backup History
      </h2>

      <div className="space-y-4">
        {backups.map(
          (backup, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-xl border p-4"
            >
              <div>
                <h3 className="font-semibold">
                  {backup.date}
                </h3>

                <p className="text-sm text-gray-500">
                  Automatic Backup
                </p>
              </div>

              <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-600">
                {
                  backup.status
                }
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
}