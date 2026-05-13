export default function WorkspaceStorage() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          Workspace Storage
        </h2>

        <span className="text-sm text-gray-500">
          72% Used
        </span>
      </div>

      <div className="mt-6 h-4 overflow-hidden rounded-full bg-gray-200">
        <div className="h-full w-[72%] rounded-full bg-black" />
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="rounded-xl border p-4">
          <p className="text-sm text-gray-500">
            Images
          </p>

          <h3 className="mt-2 text-2xl font-bold">
            4GB
          </h3>
        </div>

        <div className="rounded-xl border p-4">
          <p className="text-sm text-gray-500">
            Documents
          </p>

          <h3 className="mt-2 text-2xl font-bold">
            2GB
          </h3>
        </div>

        <div className="rounded-xl border p-4">
          <p className="text-sm text-gray-500">
            Backups
          </p>

          <h3 className="mt-2 text-2xl font-bold">
            1GB
          </h3>
        </div>
      </div>
    </div>
  );
}