"use client";

import { Box, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CommentIcon from "@mui/icons-material/Comment";

interface Props {
  isAuthor: boolean;
  canComment: boolean;
  onDelete?: () => void;
  onCommentClick?: () => void;
}

export default function ControlBar({
  isAuthor,
  canComment,
  onDelete,
  onCommentClick,
}: Props) {
  return (
    <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
      {isAuthor && (
        <Tooltip title="Delete post">
          <IconButton
            color="error"
            size="small"
            onClick={onDelete}
            disabled={!onDelete}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}

      {canComment && (
        <Tooltip title="Add comment">
          <IconButton
            color="primary"
            size="small"
            onClick={onCommentClick}
            disabled={!onCommentClick}
          >
            <CommentIcon />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
}
