import axiosInstance from "./axiosInstance";
import type { Post } from "../types/types";



export const getAllPosts = async (): Promise<Post[]> => {
  const response = await axiosInstance.get('/api/exhibits');
  return response.data.data || [];
};

export const getPostById = async (id: number): Promise<Post> => {
  const response = await axiosInstance.get(`/api/exhibits/${id}`);
  return response.data;
};

export const createPost = async (data: Partial<Post>): Promise<Post> => {
  const response = await axiosInstance.post('/api/exhibits', data);
  return response.data;
};

export const deletePost = async (id: number): Promise<Post> => {
  const response = await axiosInstance.delete(`/api/exhibits/${id}`);
  return response.data;
};

export const updatePost = async (id: number, data: Partial<Post>): Promise<Post> => {
  const response = await axiosInstance.put(`/api/exhibits/${id}`, data);
  return response.data;
};
