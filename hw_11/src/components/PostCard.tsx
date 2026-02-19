import Link from "next/link";
import { Box, Typography } from "@mui/material";
import PostActions from "./PostActions.client";

import type { Post } from "@/types/types";
import { baseURL } from "@/constants/constants";

interface PostCardProps {
  post: Post;
  currentUserId?: number | null;
  canComment: boolean;
}

export default function PostCard({
  post,
  currentUserId,
  canComment,
}: PostCardProps) {
  const isAuthor = currentUserId === post.user.id;

  return (
    <Box
      sx={{
        p: 2,
        border: 1,
        borderColor: "divider",
        borderRadius: 2,
        mb: 3,
        boxShadow: 1,
        backgroundColor: "background.paper",
      }}
    >
      <Link href={`/post/${post.id}`} style={{ textDecoration: "none", color: "inherit" }}>
        <Box sx={{ cursor: "pointer" }}>
          <img
            src={`${baseURL}${post.imageUrl}`}
            alt={post.description}
            style={{ width: "100%", borderRadius: 8, marginBottom: 8 }}
          />

          <Typography variant="h6" sx={{ mb: 1 }}>
            {post.description}
          </Typography>
        </Box>
      </Link>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
        {post.user.username} · {post.commentCount} {post.commentCount === 1 ? "comment" : "comments"}
      </Typography>

      <Typography variant="caption" color="text.secondary">
        {post.createdAt} 
      </Typography>

      <PostActions
        postId={post.id}
        isAuthor={isAuthor}
        canComment={canComment}
      />

    </Box>
  );
}
