export default function WorkspaceCalendar() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <h2 className="mb-6 text-2xl font-bold">
        Workspace Calendar
      </h2>

      <div className="grid grid-cols-7 gap-3 text-center">
        {Array.from({
          length: 31,
        }).map((_, index) => (
          <div
            key={index}
            className="rounded-lg border p-3 hover:bg-black hover:text-white"
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
}