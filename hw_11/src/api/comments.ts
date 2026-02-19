import { baseURL } from "@/constants/constants";
import type { Comment } from "../types/types";


export async function getAllComments(
  postId: number
): Promise<Comment[]> {
  const res = await fetch(
    `${baseURL}/api/exhibits/${postId}/comments`,
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Failed to fetch comments");

  const json = await res.json();

  return Array.isArray(json) ? json : [];
}

export async function createComment(
  postId: number,
  data: Partial<Comment>,
  token: string
): Promise<Comment> {
  const res = await fetch(
    `${baseURL}/api/exhibits/${postId}/comments`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) throw new Error("Failed to create comment");

  return res.json();
}

export async function deleteComment(
  postId: number,
  commentId: number,
  token: string
): Promise<void> {
  const res = await fetch(
    `${baseURL}/api/exhibits/${postId}/comments/${commentId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) throw new Error("Failed to delete comment");
}