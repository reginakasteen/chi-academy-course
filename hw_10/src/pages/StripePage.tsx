import { useState } from "react";
import { useRequest } from "ahooks";
import { useSelector } from "react-redux";
import { getAllPosts, deletePost } from "../api/exhibitActions";
import Stripe from "../components/Stripe";
import LoadingPage from "./LoadingPage";
import type { RootState } from "../store/store";

const StripePage = () => {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<any[]>([]);

  const { data, loading } = useRequest(
    () => getAllPosts({ page, limit: 10 }),
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

  const userId = useSelector((state: RootState) => state.user.id);
  const canComment = Boolean(useSelector((state: RootState) => state.user.token));


  if (loading || !data) return <LoadingPage />;

  return (
    <Stripe
      posts={posts}
      page={data.page}
      lastPage={data.lastPage}
      currentUserId={userId}
      canComment={canComment}
      onPageChange={setPage}
      onDeletePost={handleDeletePost}
    />

  );
};

export default StripePage;
