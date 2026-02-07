import { Box, TextField, Button } from "@mui/material";
import { useState } from "react";

interface CommentFormProps {
  onSubmit: (text: string) => void;
}

const CommentForm = ({ onSubmit }: CommentFormProps) => {
  const [text, setText] = useState("");

  const token = localStorage.getItem("token");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit(text);
    setText("");
  };

  if (!token) return null;

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <TextField
        value={text}
        onChange={(e) => setText(e.target.value)}
        label="Add a comment"
        size="small"
        fullWidth
      />
      <Button type="submit" variant="contained" sx={{ mt: 1 }}>
        Submit
      </Button>
    </Box>
  );
};

export default CommentForm;
