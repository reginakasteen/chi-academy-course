import { baseURL } from "@/constants/constants";
import type { Post, PostResponse, Comment } from "../types/types";


export async function getAllPosts(
  params: { page: number; limit: number }
): Promise<PostResponse> {
  const res = await fetch(
    `${baseURL}/api/exhibits?page=${params.page}&limit=${params.limit}`,
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Failed to fetch posts");

  const json = await res.json();

  return {
    posts: json.data ?? [],
    total: Number(json.total ?? 0),
    page: Number(json.page ?? 1),
    lastPage: Number(json.lastPage ?? 1),
  };
}

export async function getMyPosts(
  params: { page: number; limit: number },
  token: string
): Promise<PostResponse> {
  const res = await fetch(
    `${baseURL}/api/exhibits/my-posts?page=${params.page}&limit=${params.limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch my posts");

  const json = await res.json();

  return {
    posts: json.data ?? [],
    total: Number(json.total ?? 0),
    page: Number(json.page ?? 1),
    lastPage: Number(json.lastPage ?? 1),
  };
}

export async function getPostById(id: number): Promise<Post> {
  const res = await fetch(
    `${baseURL}/api/exhibits/post/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Failed to fetch post");

  return res.json();
}

export async function createPost(
  data: { description: string; image: File | null },
  token: string
): Promise<Post> {
  const formData = new FormData();

  if (data.image) formData.append("image", data.image);
  formData.append("description", data.description);

  const res = await fetch(`${baseURL}/api/exhibits`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to create post");

  return res.json();
}

export async function deletePost(
  id: number,
  token: string
): Promise<void> {
  const res = await fetch(`${baseURL}/api/exhibits/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to delete post");
}