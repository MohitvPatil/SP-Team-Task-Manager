const goals = [
  {
    title:
      "Complete Sprint Tasks",
    progress: 82,
  },
  {
    title:
      "Deploy Production API",
    progress: 65,
  },
  {
    title:
      "Improve Team Productivity",
    progress: 91,
  },
];

export default function WorkspaceGoals() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <h2 className="mb-6 text-2xl font-bold">
        Workspace Goals
      </h2>

      <div className="space-y-6">
        {goals.map((goal, index) => (
          <div key={index}>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-medium">
                {goal.title}
              </h3>

              <span className="text-sm text-gray-500">
                {goal.progress}%
              </span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-black"
                style={{
                  width: `${goal.progress}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
