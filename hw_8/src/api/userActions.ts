import axiosInstance from "./axiosInstance";
import type { RegisterData, User } from "../types/types";


export const registerUser = async (data: RegisterData): Promise<{ user: User; token: string }> => {
  const response = await axiosInstance.post("/users/register", data);
  return response.data;
};

export const loginUser = async (data: RegisterData): Promise<{ user: User; token: string }> => {
  const response = await axiosInstance.post("/users/auth/login", data);
  return response.data;
};

export const getUser = async (params: { id?: number; username?: string }): Promise<User> => {
  const response = await axiosInstance.get("/users", { params });
  return response.data;
};

export const getMyProfile = async (): Promise<User> => {
  const response = await axiosInstance.get("/users/my-profile");
  return response.data;
};
