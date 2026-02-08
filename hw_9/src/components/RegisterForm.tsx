import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import { Formik, Form, ErrorMessage } from "formik";
import { RegisterSchema } from "../schemas/registerSchema";
import { toFormikValidationSchema } from "zod-formik-adapter";

interface RegisterFormProps {
  onSubmit: (data: RegisterSchema) => void;
  error?: string | null;
}

const RegisterForm = ({ onSubmit, error }: RegisterFormProps) => {
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={toFormikValidationSchema(RegisterSchema)}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => (
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
              Register
            </Typography>

            {error && <Alert severity="error">{error}</Alert>}

            <TextField
              label="Username"
              name="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.username && Boolean(errors.username)}
              helperText={<ErrorMessage name="username" />}
            />

            <TextField
              label="Password"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && Boolean(errors.password)}
              helperText={<ErrorMessage name="password" />}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              Register
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
