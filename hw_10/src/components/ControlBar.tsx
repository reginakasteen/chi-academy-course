import { Box, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CommentIcon from "@mui/icons-material/Comment";

interface ControlBarProps {
  isAuthor: boolean;
  canComment: boolean;
  onDelete?: () => void;
  onCommentClick?: () => void;
}

const ControlBar = ({
  isAuthor,
  canComment,
  onDelete,
  onCommentClick,
}: ControlBarProps) => {
  if (!isAuthor && !canComment) return null;

  return (
    <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
      {isAuthor && onDelete && (
        <Tooltip title="Delete post">
          <IconButton size="small" onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}

      {canComment && onCommentClick && (
        <Tooltip title="Add comment">
          <IconButton size="small" color="primary" onClick={onCommentClick}>
            <CommentIcon />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
};

export default ControlBar;
