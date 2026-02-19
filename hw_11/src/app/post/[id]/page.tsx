"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import type { Post as PostType, Comment as CommentType } from "@/types/types";
import CommentStripe from "@/components/CommentStripe";
import CommentForm from "@/components/CommentForm";
import ControlBar from "@/components/ControlBar";
import { getPostById, deletePost } from "@/api/posts";
import { getAllComments, createComment, deleteComment } from "@/api/comments";
import type { RootState } from "@/store/store";

export default function PostPage() {
  const router = useRouter();
  const pathname = usePathname(); // /post/[id]
  const postId = pathname ? Number(pathname.split("/").pop()) : null;

  const [post, setPost] = useState<PostType | null>(null);
  const [comments, setComments] = useState<CommentType[]>([]);

  const currentUserId = useSelector((state: RootState) => state.user.id);
  const token = useSelector((state: RootState) => state.user.token);

  const isAuthor = post?.user.id === currentUserId;
  const canComment = Boolean(token);

  useEffect(() => {
    if (!postId) return;

    getPostById(postId)
      .then(setPost)
      .catch(() => router.push("/"));

    getAllComments(postId).then(setComments);
  }, [postId]);

  const handleDeletePost = async () => {
    if (!post) return;
    try {
      await deletePost(post.id, token);
      router.push("/");
    } catch (err) {
      console.error("Failed to delete post:", err);
    }
  };

  const handleAddComment = async (text: string) => {
    if (!post) return;
    const newComment = await createComment(post.id, { text }, token);
    setComments(prev => [...prev, newComment]);
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!post) return;
    await deleteComment(post.id, commentId, token);
    setComments(prev => prev.filter(c => c.id !== commentId));
  };

  if (!post) return <Typography>Loading post...</Typography>;

  return (
    <Box sx={{ p: 2, maxWidth: 800, mx: "auto" }}>
      <img
        src={post.imageUrl}
        alt={post.description}
        style={{ width: "100%", borderRadius: 8 }}
      />
      <Typography variant="h5" sx={{ mt: 1 }}>{post.description}</Typography>
      <Typography variant="body2" color="text.secondary">
        Author: {post.user.username} | Comments: {comments.length}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {new Date(post.createdAt).toLocaleString()}
      </Typography>

      <ControlBar
        isAuthor={isAuthor ?? false}
        canComment={canComment}
        onDelete={handleDeletePost}
        onCommentClick={() => {}}
      />

      <CommentStripe comments={comments} onDelete={handleDeleteComment} />
      {canComment && <CommentForm onSubmit={handleAddComment} />}
    </Box>
  );
}
