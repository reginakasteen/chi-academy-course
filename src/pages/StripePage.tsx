import { Box, CircularProgress } from "@mui/material";
import { useRequest } from "ahooks";
import { getAllPosts } from "../api/exhibitActions";
import Post from "../components/Post";
import type { Post as PostType } from "../types/types";

const StripePage = () => {
  const { data: posts = [], loading } = useRequest<PostType[], []>(getAllPosts);

  return (
    <Box sx={{ p: 2, maxWidth: 800, mx: "auto" }}>
      {loading && <CircularProgress />}
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </Box>
  );
};

export default StripePage;
