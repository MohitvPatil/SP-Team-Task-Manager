import api from "@/lib/axios";

export const uploadFile =
  async (file: File) => {
    const formData =
      new FormData();

    formData.append(
      "file",
      file
    );

    const response =
      await api.post(
        "/api/upload",
        formData
      );

    return response.data;
  };