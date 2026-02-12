import { Box, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Comment as CommentType } from "../types/types";

interface CommentProps {
  comment: CommentType;
  isAuthor: boolean;
  onDelete?: (id: number) => void;
}

const Comment = ({ comment, isAuthor, onDelete }: CommentProps) => {
  return (
    <Box
      sx={{
        p: 1,
        borderBottom: 1,
        borderColor: "divider",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography variant="body2">{comment.text}</Typography>
        <Typography variant="caption" color="text.secondary">
          {comment.user.username} ·{" "}
          {new Date(comment.createdAt).toLocaleString()}
        </Typography>
      </Box>

      {isAuthor && onDelete && (
        <IconButton size="small" onClick={() => onDelete(comment.id)}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      )}
    </Box>
  );
};

export default Comment;

