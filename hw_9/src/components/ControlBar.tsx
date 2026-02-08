import { Box, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CommentIcon from "@mui/icons-material/Comment";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import type { Post } from "../types/types";

interface ControlBarProps {
  post: Post;
  onDelete?: () => void;
  onCommentClick?: () => void;
}

const ControlBar = ({ post, onDelete, onCommentClick }: ControlBarProps) => {
  const userId = useSelector((state: RootState) => state.user.id);
  const token = useSelector((state: RootState) => state.user.token);

  const isAuthor = userId === post.user.id;
  const canComment = Boolean(token);

  return (
    <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
      {isAuthor && onDelete && (
        <Tooltip title="Delete post">
          <IconButton color="error" size="small" onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
      {canComment && onCommentClick && (
        <Tooltip title="Add comment">
          <IconButton color="primary" size="small" onClick={onCommentClick}>
            <CommentIcon />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
};

export default ControlBar;
