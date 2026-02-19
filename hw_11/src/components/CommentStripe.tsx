import { useState } from "react";
import { Box, Button } from "@mui/material";
import Comment from "./Comment";
import type { Comment as CommentType } from "@/types/types";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

interface CommentStripeProps {
  comments: CommentType[];
  onDelete?: (id: number) => void;
}

export default function CommentStripe({ comments, onDelete }: CommentStripeProps) {
  const [showAll, setShowAll] = useState(false);
  const currentUserId = useSelector((state: RootState) => state.user.id);

  const orderedComments = [...comments].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  const displayedComments = showAll ? orderedComments : orderedComments.slice(-3);

  return (
    <Box sx={{ mt: 2, borderTop: 1, borderColor: "divider", pt: 1 }}>
      {comments.length > 3 && !showAll && (
        <Button size="small" onClick={() => setShowAll(true)} sx={{ mt: 1 }}>
          Show all comments
        </Button>
      )}

      {displayedComments.map(comment => (
        <Comment
          key={comment.id}
          comment={comment}
          isAuthor={currentUserId === comment.user.id}
          onDelete={onDelete}
        />
      ))}
    </Box>
  );
}
