import Sidebar from "@/components/ui/Sidebar";
import Topbar from "@/components/ui/Topbar";
import PageHeader from "@/components/ui/PageHeader";
import Breadcrumb from "@/components/ui/Breadcrumb";
import CreateProjectButton from "@/components/projects/CreateProjectButton";
import ProjectsList from "@/components/projects/ProjectsList";

export default function ProjectsPage() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-100 p-8">
        <Topbar />

        <Breadcrumb page="Projects" />

        <div className="mb-8 flex items-center justify-between">
          <PageHeader
            title="Projects"
            description="Manage all projects and teams."
          />

          <CreateProjectButton />
        </div>

        <ProjectsList />
      </div>
    </div>
  );
}