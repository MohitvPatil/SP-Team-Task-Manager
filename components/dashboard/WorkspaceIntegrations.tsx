const integrations = [
  "GitHub",
  "Slack",
  "Figma",
  "Notion",
];

export default function WorkspaceIntegrations() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          Integrations
        </h2>

        <button className="rounded-xl bg-black px-5 py-2 text-white">
          Add
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {integrations.map(
          (
            integration,
            index
          ) => (
            <div
              key={index}
              className="rounded-xl border p-5 text-center font-medium"
            >
              {integration}
            </div>
          )
        )}
      </div>
    </div>
  );
}   