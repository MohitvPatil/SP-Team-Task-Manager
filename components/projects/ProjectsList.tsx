"use client";

import Loader from "@/components/ui/Loader";

import ProjectCard from "@/components/dashboard/ProjectCard";

import useProjects from "@/hooks/useProjects";

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
            title={project.title}
            tasks={
              project.tasks?.length || 0
            }
            progress={72}
          />
        )
      )}
    </div>
  );
}