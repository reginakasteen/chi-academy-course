import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import type { Post } from "../types/types";

interface NewPostFormProps {
  onSubmit: (data: { description: string; image: File | null }) => void;
}

const NewPostForm = ({ onSubmit }: NewPostFormProps) => {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ description, image });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        minWidth: 300,
      }}
    >
      <Typography variant="h6" textAlign="center">
        New Post
      </Typography>

      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        multiline
        rows={3}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
      />

      <Button type="submit" variant="contained">
        Create Post
      </Button>
    </Box>
  );
};

export default NewPostForm;
