"use client";

import Loader from "@/components/ui/Loader";

import ProjectCard from "@/components/dashboard/ProjectCard";

import useProjects from "@/hooks/useProjects";

const dateText = (value?: string) =>
  value
    ? new Intl.DateTimeFormat("en", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(new Date(value))
    : undefined;

export default function ProjectsList() {
  const {
    projects,
    loading,
  } = useProjects();

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {projects.map(
        (project: any) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            title={project.title}
            tasks={
              project._count?.tasks || project.tasks?.length || 0
            }
            progress={project.progress || 0}
            assignedAt={dateText(project.assignedAt)}
            deadline={dateText(project.deadline)}
            memberCount={project.members?.length || 0}
            health={project.health}
            state={project.state === "COMPLETED" ? "Completed" : "Ongoing"}
          />
        )
      )}
    </div>
  );
}
