import { useState } from "react";
import { useRequest } from "ahooks";
import { getMyPosts, deletePost } from "../api/exhibitActions";
import Stripe from "../components/Stripe";
import LoadingPage from "./LoadingPage";
import { Typography, Box } from "@mui/material";

const HomePage = () => {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<any[]>([]);

  const { data, loading } = useRequest(
    () => getMyPosts({ page, limit: 10 }),
    {
      refreshDeps: [page],
      onSuccess: (res) => setPosts(res.posts),
    }
  );

  const handleDeletePost = async (id: number) => {
    try {
      await deletePost(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Failed to delete post:", err);
    }
  };

  if (loading || !data) return <LoadingPage />;

  return (
    <>
      {posts.length ? (
        <Stripe
          posts={posts}
          page={data.page}
          lastPage={data.lastPage}
          onPageChange={setPage}
          onDeletePost={handleDeletePost}
        />
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh",
          }}
        >
          <Typography variant="h3" align="center">
            You don't have any posts
          </Typography>
        </Box>
      )}
    </>
  );
};

export default HomePage;
