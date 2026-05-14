import api from "@/lib/axios";

export const inviteEmployee = async (
  email: string,
  projectId: string,
  role: string = "MEMBER",
  position: string = "Staff"
) => {
  const response = await api.post("/api/team/invite", {
    email,
    projectId,
    role,
    position,
  });

  return response.data;
};

export const acceptInvite = async (token: string) => {
  const response = await api.post("/api/team/invite/accept", { token });
  return response.data;
};