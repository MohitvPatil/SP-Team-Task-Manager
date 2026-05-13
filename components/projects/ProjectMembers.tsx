import InviteMemberButton from "@/components/team/InviteMemberButton";

const members = [
  {
    name: "Mohit",
    role: "Admin",
  },
  {
    name: "Rahul",
    role: "Developer",
  },
];

export default function ProjectMembers() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          Project Members
        </h2>

        <InviteMemberButton />
      </div>

      <div className="space-y-4">
        {members.map((member, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-xl border p-4"
          >
            <div>
              <h3 className="font-semibold">
                {member.name}
              </h3>

              <p className="text-sm text-gray-500">
                {member.role}
              </p>
            </div>

            <button className="rounded-lg border px-4 py-2 text-sm">
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}