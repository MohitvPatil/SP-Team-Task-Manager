import api from "@/lib/axios";

export const login = async (data: { email: string; password: string }) => {
  const response = await api.post("/api/auth/login", data);
  return response.data;
};

export const register = async (data: {
  name: string;
  email: string;
  employeeId: string;
  password: string;
}) => {
  const response = await api.post("/api/auth/signup", data);
  return response.data;
};

export const logout = async () => {
  const response = await api.post("/api/auth/logout");
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/api/auth/me");
  return response.data;
};