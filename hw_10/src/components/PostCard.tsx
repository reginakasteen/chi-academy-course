import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { Post } from "../types/types";
import ControlBar from "./ControlBar";

interface PostCardProps {
  post: Post;
  currentUserId?: number | null;
  canComment: boolean;
  onDelete?: (id: number) => void;
}

const PostCard = ({
  post,
  currentUserId,
  canComment,
  onDelete,
}: PostCardProps) => {
  const navigate = useNavigate();

  const isAuthor = currentUserId === post.user.id;

  return (
    <Box
      sx={{
        p: 2,
        border: 1,
        borderColor: "divider",
        borderRadius: 2,
        mb: 2,
      }}
    >
      <Box
        sx={{ cursor: "pointer" }}
        onClick={() => navigate(`/post/${post.id}`)}
      >
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
        {post.user.username} · {post.commentCount} comments
      </Typography>

      <Typography variant="caption" color="text.secondary">
        {new Date(post.createdAt).toLocaleString()}
      </Typography>

      <ControlBar
        isAuthor={isAuthor}
        canComment={canComment}
        onDelete={onDelete ? () => onDelete(post.id) : undefined}
        onCommentClick={() => navigate(`/post/${post.id}`)}
      />
    </Box>
  );
};

export default PostCard;
