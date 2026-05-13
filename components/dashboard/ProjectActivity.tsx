const activities = [
  "New task added to TaskFlow",
  "Rahul completed backend API",
  "Project deadline updated",
  "New member joined workspace",
];

export default function ProjectActivity() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <h2 className="mb-6 text-2xl font-bold">
        Project Activity
      </h2>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="rounded-xl border p-4"
          >
            <p>{activity}</p>
          </div>
        ))}
      </div>
    </div>
  );
}