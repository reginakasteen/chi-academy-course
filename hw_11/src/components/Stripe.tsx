import { Box } from "@mui/material";
import PostCard from "./PostCard";

interface Props {
  posts: any[];
  page: number;
  lastPage: number;
  currentUserId?: number | null;
  canComment: boolean;
}

export default function Stripe({
  posts,
  page,
  lastPage,
  currentUserId,
  canComment,
}: Props) {
  return (
    <Box sx={{ p: 2, maxWidth: 800, mx: "auto" }}>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          currentUserId={currentUserId}
          canComment={canComment}
        />
      ))}

      {lastPage > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3, gap: 1 }}>
          {Array.from({ length: lastPage }, (_, i) => {
            const pageNumber = i + 1;
            return (
              <a
                key={pageNumber}
                href={`?page=${pageNumber}`}
                style={{
                  padding: "8px 12px",
                  borderRadius: 4,
                  border: pageNumber === page ? "2px solid #1976d2" : "1px solid #ccc",
                  background: pageNumber === page ? "#e3f2fd" : "transparent",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                {pageNumber}
              </a>
            );
          })}
        </Box>
      )}
    </Box>
  );
}
