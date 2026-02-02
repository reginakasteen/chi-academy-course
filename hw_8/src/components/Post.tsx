import { Box, Typography } from "@mui/material";
import type { Post as PostType } from "../types/types";

interface PostProps {
  post: PostType;
}

const Post = ({ post }: PostProps) => {
  return (
    <Box sx={{ p: 2, border: 1, borderColor: "divider", borderRadius: 2, mb: 2 }}>
      <img src={post.imageUrl} alt={post.description} style={{ width: "100%", borderRadius: 8 }} />
      <Typography variant="h6" sx={{ mt: 1 }}>
        {post.description}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Author: {post.user.username} | Comments: {post.commentCount}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {new Date(post.createdAt).toLocaleString()}
      </Typography>
    </Box>
  );
};

export default Post;
