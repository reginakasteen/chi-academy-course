import { cookies } from "next/headers";
import { getAllPosts } from "@/api/posts";
import Stripe from "@/components/Stripe";
import { POSTS_LIMIT } from "@/constants/constants";

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function StripePage({ searchParams }: Props) {
  const params = await searchParams;

  const page = Number(params.page ?? 1);


  const data = await getAllPosts({
    page,
    limit: POSTS_LIMIT,
  });

  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;
  const token = cookieStore.get("token")?.value;

  return (
    <Stripe
      posts={data.posts}
      page={data.page}
      lastPage={data.lastPage}
      currentUserId={userId ? Number(userId) : null}
      canComment={Boolean(token)}
    />
  );
}
