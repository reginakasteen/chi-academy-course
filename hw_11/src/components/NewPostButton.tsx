"use client";

import { Button } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";

export default function NewPostButton() {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    router.push("/new-post");
  };

  return (
    <Button color="inherit" onClick={handleClick}>
      New Post
    </Button>
  );
}
