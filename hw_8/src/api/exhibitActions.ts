import axiosInstance from "./axiosInstance";
import type { Post } from "../types/types";



export const getAllPosts = async (params: { page: number; limit: number }) => {
  const response = await axiosInstance.get("/api/exhibits", { params });
  return {
    posts: response.data.data,      
    total: response.data.total,    
    page: Number(response.data.page),
    lastPage: Number(response.data.lastPage)
  };
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

// export const updatePost = async (id: number, data: Partial<Post>): Promise<Post> => {
//   const response = await axiosInstance.put(`/api/exhibits/${id}`, data);
//   return response.data;
// };


export const getMyPosts = async (params: { page: number; limit: number }) => {
  const response = await axiosInstance.get("/api/exhibits/my-posts", { params });
  return {
    posts: response.data.data,      
    total: response.data.total,    
    page: Number(response.data.page),
    lastPage: Number(response.data.lastPage)
  };
};