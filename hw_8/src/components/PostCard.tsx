import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { Post as PostType } from "../types/types";
import ControlBar from "./ControlBar";

interface PostProps {
  post: PostType;
  onDelete?: (id: number) => void;
}

const PostCard = ({ post, onDelete }: PostProps) => {
  const navigate = useNavigate();

  const handleClickPost = () => {
    navigate(`/post/${post.id}`);
  };

  return (
    <Box
      sx={{
        p: 2,
        border: 1,
        borderColor: "divider",
        borderRadius: 2,
        mb: 2,
        cursor: "pointer",
      }}
    >
      <Box onClick={handleClickPost}>
        <img
          src={post.imageUrl}
          alt={post.description}
          style={{ width: "100%", borderRadius: 8 }}
        />
        <Typography variant="h6" sx={{ mt: 1 }}>
          {post.description}
        </Typography>
      </Box>

      <Typography variant="body2" color="text.secondary">
        Author: {post.user.username} | Comments: {post.commentCount}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {new Date(post.createdAt).toLocaleString()}
      </Typography>

      <ControlBar
        post={post}
        onDelete={() => onDelete?.(post.id)}
        onCommentClick={() => navigate(`/post/${post.id}`)}
      />
    </Box>
  );
};

export default PostCard;
