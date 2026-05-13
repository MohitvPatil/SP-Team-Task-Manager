"use client";

import { useEffect, useState } from "react";

import { getProjects } from "@/services/projectService";

export default function useProjects() {
  const [projects, setProjects] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchProjects =
      async () => {
        try {
          const data =
            await getProjects();

          setProjects(data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

    fetchProjects();
  }, []);

  return {
    projects,
    loading,
  };
}