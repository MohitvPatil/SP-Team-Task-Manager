import api from "@/lib/axios";

export const getTasks = async () => {
  const response = await api.get(
    "/api/tasks"
  );

  return response.data;
};

export const createTask = async (
  data: {
    title: string;
    description: string;
    priority: string;
    projectId: string;
  }
) => {
  const response = await api.post(
    "/api/tasks",
    data
  );

  return response.data;
};

export const updateTask =
  async (
    id: string,
    data: {
      title: string;
      description: string;
      priority: string;
      status: string;
    }
  ) => {
    const response = await api.put(
      `/api/tasks/${id}`,
      data
    );

    return response.data;
  };

export const deleteTask =
  async (id: string) => {
    const response = await api.delete(
      `/api/tasks/${id}`
    );

    return response.data;
  };