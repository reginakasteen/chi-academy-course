import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import { Formik, Form, ErrorMessage } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { loginSchema } from "../schemas/LoginSchema";
import type { LoginSchema } from "../schemas/LoginSchema";

interface LoginFormProps {
  onSubmit: (data: LoginSchema) => void;
  error?: string | null;
}

const LoginForm = ({ onSubmit, error }: LoginFormProps) => {
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={toFormikValidationSchema(loginSchema)}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ values, handleChange, handleBlur, isSubmitting }) => (
        <Form>
          <Box
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
              Login
            </Typography>

            {error && <Alert severity="error">{error}</Alert>}

            <TextField
              label="Username"
              name="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(values.username.length < 4)}
              helperText={<ErrorMessage name="username" />}
            />

            <TextField
              label="Password"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(values.password.length < 4)}
              helperText={<ErrorMessage name="password" />}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              Login
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
