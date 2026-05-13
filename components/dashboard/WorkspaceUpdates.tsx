const updates = [
  "New dashboard released",
  "Authentication improved",
  "Database optimized",
  "Added task analytics",
];

export default function WorkspaceUpdates() {
  return (
    <div className="rounded-2xl bg-black p-6 text-white shadow">
      <h2 className="mb-6 text-2xl font-bold">
        Latest Updates
      </h2>

      <div className="space-y-4">
        {updates.map((update, index) => (
          <div
            key={index}
            className="rounded-xl bg-white/10 p-4"
          >
            {update}
          </div>
        ))}
      </div>
    </div>
  );
}