import api from "@/lib/axios";

export const inviteEmployee =
  async (email: string) => {
    const response =
      await api.post(
        "/api/team/invite",
        {
          email,
        }
      );

    return response.data;
  };