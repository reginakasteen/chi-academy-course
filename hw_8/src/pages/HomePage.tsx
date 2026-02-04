import { useState } from "react";
import { useRequest } from "ahooks";
import { getMyPosts } from "../api/exhibitActions";
import Stripe from "../components/Stripe";
import LoadingPage from "./LoadingPage";
import { Typography } from "@mui/material";

const HomePage = () => {
  const [page, setPage] = useState(1);

  const { data, loading } = useRequest(
    () => getMyPosts({ page, limit: 10 }),
    {
      refreshDeps: [page],
    }
  );

  if (loading || !data) return <LoadingPage />;

  return (
    <>
    {data ? (<Stripe
      posts={data.posts}
      page={data.page}
      lastPage={data.lastPage}
      onPageChange={setPage}
    />) : (<Typography>no posts</Typography>)}
    </>
    
  );
};

export default HomePage;