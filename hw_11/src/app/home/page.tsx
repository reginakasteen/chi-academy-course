import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getMyPosts } from "@/api/posts";
import Stripe from "@/components/Stripe";
import { POSTS_LIMIT } from "@/constants/constants";

interface Props {
  searchParams: { page?: string };
}

export default async function HomePage({ searchParams }: Props) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const userId = cookieStore.get("userId")?.value;

  if (!token) redirect("/auth/login");

  const page = Number(searchParams.page ?? 1);

  const data = await getMyPosts(
    { page, limit: POSTS_LIMIT },
    token
  );

  return (
    <Stripe
      posts={data.posts}
      page={data.page}
      lastPage={data.lastPage}
      currentUserId={userId ? Number(userId) : null}
      canComment
    />
  );
}
