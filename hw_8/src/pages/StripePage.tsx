import { useState } from "react";
import { useRequest } from "ahooks";
import { getAllPosts } from "../api/exhibitActions";
import Stripe from "../components/Stripe";
import LoadingPage from "./LoadingPage";

const StripePage = () => {
  const [page, setPage] = useState(1);

  const { data, loading } = useRequest(
    () => getAllPosts({ page, limit: 10 }),
    {
      refreshDeps: [page],
    }
  );

  if (loading || !data) return <LoadingPage />;

  return (
    <Stripe
      posts={data.posts}
      page={data.page}
      lastPage={data.lastPage}
      onPageChange={setPage}
    />
  );
};

export default StripePage;
