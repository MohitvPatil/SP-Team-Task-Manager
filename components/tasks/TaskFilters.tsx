import SearchInput from "@/components/ui/SearchInput";

export default function TaskFilters() {
  return (
    <div className="mb-8 flex flex-wrap gap-4">
      <select className="rounded-xl border bg-white px-4 py-3 shadow">
        <option>
          All Priorities
        </option>

        <option>High</option>

        <option>Medium</option>

        <option>Low</option>
      </select>

      <select className="rounded-xl border bg-white px-4 py-3 shadow">
        <option>
          All Status
        </option>

        <option>Todo</option>

        <option>
          In Progress
        </option>

        <option>
          Completed
        </option>
      </select>

      <div className="min-w-[250px] flex-1">
        <SearchInput placeholder="Search Tasks..." />
      </div>
    </div>
  );
}