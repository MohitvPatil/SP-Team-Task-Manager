export default function WorkspaceBanner() {
  return (
    <div className="rounded-3xl bg-black p-10 text-white shadow">
      <h1 className="text-5xl font-bold">
        Welcome Back, Mohit 👋
      </h1>

      <p className="mt-4 max-w-2xl text-lg text-gray-300">
        Track tasks, manage projects and
        collaborate with your team efficiently.
      </p>

      <button className="mt-8 rounded-2xl bg-white px-6 py-3 text-black">
        Explore Workspace
      </button>
    </div>
  );
}