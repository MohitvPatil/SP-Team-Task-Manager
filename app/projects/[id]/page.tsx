import Sidebar from "@/components/ui/Sidebar";

import Topbar from "@/components/ui/Topbar";

import ProjectDetails from "@/components/projects/ProjectDetails";

import DragDropBoard from "@/components/kanban/DragDropBoard";

import ProjectMembers from "@/components/projects/ProjectMembers";

import TeamChat from "@/components/dashboard/TeamChat";

export default function SingleProjectPage() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-100 p-8">
        <Topbar />

        <ProjectDetails
          title="TaskFlow"
          description="Modern project management platform."
        />

        <div className="mt-8">
          <ProjectMembers />
        </div>

        <div className="mt-8">
          <TeamChat />
        </div>

        <div className="mt-8">
          <DragDropBoard />
        </div>
      </div>
    </div>
  );
}