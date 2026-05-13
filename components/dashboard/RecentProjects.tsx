const projects = [
  "TaskFlow SaaS",
  "CRM Dashboard",
  "AI Analytics Platform",
];

export default function RecentProjects() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <h2 className="mb-6 text-2xl font-bold">
        Recent Projects
      </h2>

      <div className="space-y-4">
        {projects.map((project, index) => (
          <div
            key={index}
            className="rounded-xl border p-4"
          >
            <p className="font-medium">
              {project}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}