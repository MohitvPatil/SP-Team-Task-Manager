const members = [
  {
    name: "Mohit",
    role: "Admin",
  },
  {
    name: "Rahul",
    role: "Developer",
  },
  {
    name: "Aman",
    role: "Designer",
  },
];

export default function TeamMembers() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <h2 className="mb-6 text-2xl font-bold">
        Team Members
      </h2>

      <div className="space-y-4">
        {members.map((member, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-xl border p-4"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
                {member.name.charAt(0)}
              </div>

              <div>
                <h3 className="font-semibold">
                  {member.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {member.role}
                </p>
              </div>
            </div>

            <button className="rounded-lg border px-4 py-2 text-sm">
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}