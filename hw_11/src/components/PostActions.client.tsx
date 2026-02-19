"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import ControlBar from "./ControlBar";
import { deletePostAction } from "@/app/actions/postActions";

interface Props {
  postId: number;
  isAuthor: boolean;
  canComment: boolean;
}

export default function PostActions({
  postId,
  isAuthor,
  canComment,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      await deletePostAction(postId);
      router.refresh();
    });
  };

  const handleComment = () => {
    router.push(`/post/${postId}`);
  };

  return (
    <ControlBar
      isAuthor={isAuthor}
      canComment={canComment}
      onDelete={isAuthor ? handleDelete : undefined}
      onCommentClick={canComment ? handleComment : undefined}
    />
  );
}
