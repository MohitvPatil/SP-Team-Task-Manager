export default function WorkspaceAnalytics() {
  return (
    <div className="rounded-2xl bg-black p-6 text-white shadow">
      <h2 className="text-2xl font-bold">
        Workspace Analytics
      </h2>

      <div className="mt-8 grid grid-cols-2 gap-6">
        <div>
          <p className="text-gray-400">
            Active Users
          </p>

          <h3 className="mt-2 text-4xl font-bold">
            148
          </h3>
        </div>

        <div>
          <p className="text-gray-400">
            Weekly Growth
          </p>

          <h3 className="mt-2 text-4xl font-bold">
            +18%
          </h3>
        </div>

        <div>
          <p className="text-gray-400">
            Open Tasks
          </p>

          <h3 className="mt-2 text-4xl font-bold">
            39
          </h3>
        </div>

        <div>
          <p className="text-gray-400">
            Completed
          </p>

          <h3 className="mt-2 text-4xl font-bold">
            214
          </h3>
        </div>
      </div>
    </div>
  );
}