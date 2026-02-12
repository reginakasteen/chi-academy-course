import { useState } from "react";
import { Box, Button } from "@mui/material";
import type { Comment as CommentType } from "../types/types";
import Comment from "./Comment";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

interface CommentStripeProps {
  comments: CommentType[];
  onDelete?: (id: number) => void;
}

const CommentStripe = ({ comments, onDelete }: CommentStripeProps) => {
  const [showAll, setShowAll] = useState(false);
  const displayedComments = showAll ? comments : comments.slice(-3);

  const currentUserId = useSelector((state: RootState) => state.user.id);

  return (
    <Box sx={{ mt: 2, borderTop: 1, borderColor: "divider", pt: 1 }}>
      {displayedComments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          isAuthor={currentUserId === comment.user.id} 
          onDelete={onDelete}
        />
      ))}

      {comments.length > 3 && !showAll && (
        <Button size="small" onClick={() => setShowAll(true)} sx={{ mt: 1 }}>
          Show all comments
        </Button>
      )}
    </Box>
  );
};

export default CommentStripe;
