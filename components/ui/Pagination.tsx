export default function Pagination() {
  return (
    <div className="mt-8 flex items-center justify-center gap-4">
      <button className="rounded-xl border bg-white px-4 py-2 shadow">
        Previous
      </button>

      <button className="rounded-xl bg-black px-4 py-2 text-white">
        1
      </button>

      <button className="rounded-xl border bg-white px-4 py-2 shadow">
        2
      </button>

      <button className="rounded-xl border bg-white px-4 py-2 shadow">
        Next
      </button>
    </div>
  );
}