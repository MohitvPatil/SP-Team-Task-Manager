import api from "@/lib/axios";

export const getProjects =
  async () => {
    const response =
      await api.get(
        "/api/projects"
      );

    return response.data;
  };

export const getProjectById =
  async (id: string) => {
    const response =
      await api.get(
        `/api/projects/${id}`
      );

    return response.data;
  };

export const createProject =
  async (data: {
    title: string;
    description: string;
  }) => {
    const response =
      await api.post(
        "/api/projects",
        data
      );

    return response.data;
  };

export const updateProject =
  async (
    id: string,
    data: {
      title: string;
      description: string;
    }
  ) => {
    const response =
      await api.put(
        `/api/projects/${id}`,
        data
      );

    return response.data;
  };

export const deleteProject =
  async (id: string) => {
    const response =
      await api.delete(
        `/api/projects/${id}`
      );

    return response.data;
  };
