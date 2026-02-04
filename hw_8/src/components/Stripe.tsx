import { Box, Pagination } from "@mui/material";
import Post from "./Post";
import type { Post as PostType } from "../types/types";

interface StripeProps {
  posts: PostType[];
  page: number;
  lastPage: number;
  onPageChange: (page: number) => void;
}

const Stripe = ({ posts, page, lastPage, onPageChange }: StripeProps) => {
  return (
    <Box sx={{ p: 2, maxWidth: 800, mx: "auto" }}>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}

      {lastPage > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Pagination
            count={lastPage}
            page={page}
            onChange={(_, value) => onPageChange(value)}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
};

export default Stripe;
