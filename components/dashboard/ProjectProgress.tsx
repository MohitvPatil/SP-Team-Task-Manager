const projects = [
  {
    title: "TaskFlow",
    progress: 82,
  },
  {
    title: "CRM Dashboard",
    progress: 65,
  },
];

export default function ProjectProgress() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <h2 className="mb-6 text-2xl font-bold">
        Project Progress
      </h2>

      <div className="space-y-6">
        {projects.map((project, index) => (
          <div key={index}>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-medium">
                {project.title}
              </h3>

              <span className="text-sm text-gray-500">
                {project.progress}%
              </span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-black"
                style={{
                  width: `${project.progress}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}