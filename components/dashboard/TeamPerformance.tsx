


const members = [
  {
    name: "Mohit",
    completed: 18,
  },
  {
    name: "Rahul",
    completed: 12,
  },
  {
    name: "Aman",
    completed: 9,
  },
];

export default function TeamPerformance() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <h2 className="mb-6 text-2xl font-bold">
        Team Performance
      </h2>

      <div className="space-y-5">
        {members.map((member, index) => (
          <div key={index}>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-medium">
                {member.name}
              </h3>

              <span className="text-sm text-gray-500">
                {member.completed} Tasks
              </span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-black"
                style={{
                  width: `${
                    member.completed * 5
                  }%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}