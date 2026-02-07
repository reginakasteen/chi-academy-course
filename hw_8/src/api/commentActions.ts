import axiosInstance from "./axiosInstance";
import type { Comment } from "../types/types";


export const getAllComments = async (id: number): Promise<Comment[]> => {
  const response = await axiosInstance.get(`/api/exhibits/${id}/comments`);
  return Array.isArray(response.data) ? response.data : [];
};


export const createComment = async (id: number, data: Partial<Comment>): Promise<Comment> => {
  const response = await axiosInstance.post(`/api/exhibits/${id}/comments`, data);
  return response.data;
};

export const deleteComment = async (id: number, comment_id: number): Promise<Comment> => {
  const response = await axiosInstance.delete(`/api/exhibits/${id}/comments/${comment_id}`);
  return response.data;
};
