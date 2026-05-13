const members = [
  {
    name: "Mohit",
    role: "Admin",
    status: "Active",
  },
  {
    name: "Rahul",
    role: "Developer",
    status: "Online",
  },
  {
    name: "Aman",
    role: "Designer",
    status: "Offline",
  },
];

export default function WorkspaceMembers() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          Workspace Members
        </h2>

        <button className="rounded-xl bg-black px-5 py-2 text-white">
          Add Member
        </button>
      </div>

      <div className="space-y-4">
        {members.map((member, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-xl border p-4"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
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

            <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-600">
              {member.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}