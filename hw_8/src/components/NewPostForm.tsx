import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input type="file" accept="image/*" onChange={handleFileChange} required />
      <Button type="submit" variant="contained">
        Create Post
      </Button>
    </Box>
  );
};

export default NewPostForm;
