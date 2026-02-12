import { Box, Pagination } from "@mui/material";
import type { Post } from "../types/types";
import PostCard from "./PostCard";

interface StripeProps {
  posts: Post[];
  page: number;
  lastPage: number;
  currentUserId?: number | null;
  canComment: boolean;
  onPageChange: (page: number) => void;
  onDeletePost?: (id: number) => void;
}

const Stripe = ({
  posts,
  page,
  lastPage,
  currentUserId,
  canComment,
  onPageChange,
  onDeletePost,
}: StripeProps) => {
  return (
    <Box sx={{ p: 2, maxWidth: 800, mx: "auto" }}>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          currentUserId={currentUserId}
          canComment={canComment}
          onDelete={onDeletePost}
        />
      ))}

      {lastPage > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Pagination
            count={lastPage}
            page={page}
            onChange={(_, value) => onPageChange(value)}
          />
        </Box>
      )}
    </Box>
  );
};

export default Stripe;
