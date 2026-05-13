export default function WorkspaceCard() {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-black to-gray-800 p-6 text-white shadow">
      <h2 className="text-2xl font-bold">
        Workspace Overview
      </h2>

      <div className="mt-6 grid grid-cols-2 gap-6">
        <div>
          <p className="text-gray-300">
            Projects
          </p>

          <h3 className="mt-2 text-4xl font-bold">
            12
          </h3>
        </div>

        <div>
          <p className="text-gray-300">
            Team Members
          </p>

          <h3 className="mt-2 text-4xl font-bold">
            28
          </h3>
        </div>
      </div>
    </div>
  );
}