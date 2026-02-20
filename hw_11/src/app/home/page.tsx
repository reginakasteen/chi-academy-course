import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getMyPosts } from "@/api/posts";
import Stripe from "@/components/Stripe";
import { POSTS_LIMIT } from "@/constants/constants";
import { Box, Typography } from "@mui/material";

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function HomePage({ searchParams }: Props) {
  const params = await searchParams;

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const userId = cookieStore.get("userId")?.value;

  if (!token) redirect("/auth/login");

  const page = Number(params.page ?? 1);

  const data = await getMyPosts(
    { page, limit: POSTS_LIMIT },
    token
  );

  return (
    data.posts.length ? (
      <Stripe
      posts={data.posts}
      page={data.page}
      lastPage={data.lastPage}
      currentUserId={userId ? Number(userId) : null}
      canComment
    />
    ) : (
        <Box sx={{ textAlign: "center", mt: 10 }}>
          <Typography variant="h3">You don't have any posts</Typography>
        </Box>
    )
  );
}