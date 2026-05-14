import InviteEmployeeButton from "@/components/team/InviteEmployeeButton";

const employees = [
  {
    name: "Mohit",
    role: "Admin",
  },
  {
    name: "Rahul",
    role: "Developer",
  },
];

export default function ProjectEmployees() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow dark:bg-gray-950 dark:border dark:border-gray-800">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold dark:text-white">
          Project Employees
        </h2>

        <InviteEmployeeButton />
      </div>

      <div className="space-y-4">
        {employees.map((employee, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-xl border p-4 dark:border-gray-800"
          >
            <div>
              <h3 className="font-semibold dark:text-white">
                {employee.name}
              </h3>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                {employee.role}
              </p>
            </div>

            <button className="rounded-lg border px-4 py-2 text-sm dark:border-gray-700 dark:text-gray-300">
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}