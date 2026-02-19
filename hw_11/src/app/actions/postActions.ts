"use server";

import { deletePost } from "@/api/posts";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function deletePostAction(postId: number) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) throw new Error("Unauthorized");

  await deletePost(postId, token);

  // обновляем ленту
  revalidatePath("/");
}
