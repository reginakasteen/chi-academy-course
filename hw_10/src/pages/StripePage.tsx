import { useState, useCallback } from "react";
import { useRequest } from "ahooks";
import { Snackbar, Typography, Box } from "@mui/material";

import { getAllPosts, deletePost } from "../api/exhibitActions";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

import Stripe from "../components/Stripe";
import LoadingPage from "./LoadingPage";
import { POSTS_LIMIT } from "../constants/constants";
import type { PostsResponse } from "../types/types";

const StripePage = () => {
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const { id: currentUserId, token } = useSelector(
    (state: RootState) => state.user
  );

  const canComment = Boolean(token);


  const { data, loading, error: requestError, mutate } =
  useRequest<PostsResponse, [{ page: number; limit: number }]>(
    getAllPosts,
    {
      defaultParams: [{ page, limit: POSTS_LIMIT }],
      refreshDeps: [page],
    }
  );


  const handleDeletePost = useCallback(
    async (id: number) => {
      if (!data) return;

      const prevData = data;

      mutate({
        ...data,
        posts: data.posts.filter((p) => p.id !== id),
      });

      try {
        await deletePost(id);
      } catch {
        mutate(prevData);
        setError("Failed to delete post");
      }
    },
    [data, mutate]
  );




  if (loading) return <LoadingPage />;
  if (requestError) return (
                      <Box sx={{ textAlign: "center", mt: 10 }}>
                        <Typography variant="h3">Failed to load posts</Typography>
                      </Box>);  if (!data) return null;

  return (
    <>
      <Stripe
        posts={data.posts}
        page={data.page}
        lastPage={data.lastPage}
        currentUserId={currentUserId}
        canComment={canComment}
        onPageChange={setPage}
        onDeletePost={handleDeletePost}
      />

      <Snackbar
        open={Boolean(error)}
        autoHideDuration={3000}
        onClose={() => setError(null)}
        message={error}
      />
    </>
  );
};

export default StripePage;
