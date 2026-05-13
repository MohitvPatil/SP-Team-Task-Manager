import Sidebar from "@/components/ui/Sidebar";
import Topbar from "@/components/ui/Topbar";
import PageHeader from "@/components/ui/PageHeader";
import TaskFilters from "@/components/tasks/TaskFilters";
import TasksTable from "@/components/tasks/TasksTable";
import Pagination from "@/components/ui/Pagination";
import TasksList from "@/components/tasks/TasksList";

export default function TasksPage() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-100 p-8">
        <Topbar />

        <PageHeader
          title="Tasks"
          description="Track and manage all tasks."
        />

        <TaskFilters />

        <TasksList />

        <div className="mt-8">
          <TasksTable />
        </div>

        <Pagination />
      </div>
    </div>
  );
}