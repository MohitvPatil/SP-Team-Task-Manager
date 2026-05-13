import Sidebar from "@/components/ui/Sidebar";
import Topbar from "@/components/ui/Topbar";
import PageHeader from "@/components/ui/PageHeader";

export default function SettingsPage() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-100 p-8">
        <Topbar />

        <PageHeader
          title="Settings"
          description="Manage workspace settings and preferences."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow">
            <h2 className="text-2xl font-bold">
              Profile Settings
            </h2>

            <div className="mt-6 space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full rounded-xl border p-3"
              />

              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-xl border p-3"
              />

              <button className="rounded-xl bg-black px-6 py-3 text-white">
                Save Changes
              </button>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <h2 className="text-2xl font-bold">
              Workspace Settings
            </h2>

            <div className="mt-6 space-y-4">
              <input
                type="text"
                placeholder="Workspace Name"
                className="w-full rounded-xl border p-3"
              />

              <select className="w-full rounded-xl border p-3">
                <option>Admin</option>
                <option>Member</option>
              </select>

              <button className="rounded-xl bg-black px-6 py-3 text-white">
                Update Workspace
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}