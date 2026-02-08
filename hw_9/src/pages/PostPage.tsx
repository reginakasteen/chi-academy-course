import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import type { Post as PostType, Comment as CommentType } from "../types/types";
import CommentStripe from "../components/CommentStripe";
import CommentForm from "../components/CommentForm";
import ControlBar from "../components/ControlBar";
import { getPostById, deletePost } from "../api/exhibitActions";
import { getAllComments, createComment, deleteComment } from "../api/commentActions";

const PostPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [post, setPost] = useState<PostType | null>(null);
  const [comments, setComments] = useState<CommentType[]>([]);

  useEffect(() => {
    if (!id) return;
    getPostById(Number(id))
      .then(setPost)
      .catch(() => navigate("/"));
    getAllComments(Number(id)).then(setComments);
  }, [id]);

  const handleDeletePost = async () => {
    if (!post) return;
    try {
      await deletePost(post.id);
      navigate("/");
    } catch (err) {
      console.error("Failed to delete post:", err);
    }
  };

  const handleAddComment = async (text: string) => {
    if (!post) return;
    const newComment = await createComment(post.id, { text });
    setComments(prev => [...prev, newComment]);
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!post) return;
    try {
      await deleteComment(post.id, commentId);
      setComments(prev => prev.filter(c => c.id !== commentId));
    } catch (err) {
      console.error("Failed to delete comment:", err);
    }
  };

  if (!post) return <Typography>Loading post...</Typography>;

  return (
    <Box sx={{ p: 2, maxWidth: 800, mx: "auto" }}>
      <img
        src={post.imageUrl}
        alt={post.description}
        style={{ width: "100%", borderRadius: 8 }}
      />
      <Typography variant="h5" sx={{ mt: 1 }}>
        {post.description}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Author: {post.user.username} | Comments: {comments.length}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {new Date(post.createdAt).toLocaleString()}
      </Typography>

      <ControlBar post={post} onDelete={handleDeletePost} onCommentClick={() => {}} />

      <CommentStripe comments={comments} onDelete={handleDeleteComment} />
      <CommentForm onSubmit={handleAddComment} />
    </Box>
  );
};

export default PostPage;
