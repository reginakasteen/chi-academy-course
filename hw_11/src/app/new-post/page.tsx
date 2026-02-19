"use client";

import ModalLayout from "../../layouts/ModalLayout";
import NewPostForm from "@/components/NewPostForm";
import { createPost } from "@/api/posts";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Alert } from "@mui/material";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export default function NewPostPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const token = useSelector((state: RootState) => state.user.token);


  const handleSubmit = async (data: { description: string; image: File | null }) => {
    try {
      await createPost(data, token);  
      router.push("/home");
    } catch (err: any) {
      setError(err?.message || "Failed to create post");
    }
  };

  return (
    <ModalLayout>
      {error && <Alert severity="error">{error}</Alert>}
      <NewPostForm onSubmit={handleSubmit} />
    </ModalLayout>
  );
}
