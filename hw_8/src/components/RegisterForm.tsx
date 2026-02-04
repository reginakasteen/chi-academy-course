import { useState } from "react";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";

interface RegisterFormProps {
  onSubmit: (data: { username: string; password: string }) => void;
  error?: string | null;
}

const RegisterForm = ({ onSubmit, error }: RegisterFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    onSubmit({ username, password });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 4,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h5" textAlign="center">
        Register
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <Button type="submit" variant="contained" color="primary">
        Register
      </Button>
    </Box>
  );
};

export default RegisterForm;
