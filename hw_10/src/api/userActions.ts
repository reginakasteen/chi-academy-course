import axiosInstance from "./axiosInstance";
import type { User } from "../types/types";

export const getUser = async (params: { id?: number; username?: string }): Promise<User> => {
  const response = await axiosInstance.get("/users", { params });
  return response.data;
};

export const getMyProfile = async (): Promise<User> => {
  const response = await axiosInstance.get("/users/my-profile");
  return response.data;
};
