import { Box, TextField, Button } from "@mui/material";
import { Formik, Form } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { commentSchema } from "@/schemas/CommentSchema";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

interface CommentFormProps {
  onSubmit: (text: string) => void;
}

export default function CommentForm({ onSubmit }: CommentFormProps) {
  const token = useSelector((state: RootState) => state.user.token);
  if (!token) return null;

  return (
    <Formik
      initialValues={{ text: "" }}
      validationSchema={toFormikValidationSchema(commentSchema)}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        onSubmit(values.text);
        resetForm();
        setSubmitting(false);
      }}
    >
      {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => (
        <Form>
          <Box sx={{ mt: 1 }}>
            <TextField
              name="text"
              label="Add a comment"
              size="small"
              fullWidth
              value={values.text}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(errors.text && touched.text)}
              helperText={touched.text && errors.text ? errors.text : ""}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 1 }}
              disabled={isSubmitting}
            >
              Submit
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
}
