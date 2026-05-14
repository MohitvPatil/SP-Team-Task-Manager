import Sidebar from "@/components/ui/Sidebar";
import Topbar from "@/components/ui/Topbar";

export default function ProfilePage() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-100 p-8">
        <Topbar />

        <div className="rounded-2xl bg-white p-8 shadow">
          <div className="flex items-center gap-6">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-black text-4xl text-white">
              M
            </div>

            <div>
              <h1 className="text-4xl font-bold">
                Mohit Patil
              </h1>

              <p className="mt-2 text-gray-500">
                Full Stack Developer • <span className="font-bold text-black">EMP-001</span>
              </p>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-2xl border p-6">
              <h2 className="text-xl font-bold">
                Total Projects
              </h2>

              <p className="mt-4 text-4xl font-bold">
                12
              </p>
            </div>

            <div className="rounded-2xl border p-6">
              <h2 className="text-xl font-bold">
                Completed Tasks
              </h2>

              <p className="mt-4 text-4xl font-bold">
                84
              </p>
            </div>

            <div className="rounded-2xl border p-6">
              <h2 className="text-xl font-bold">
                Productivity
              </h2>

              <p className="mt-4 text-4xl font-bold">
                92%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}