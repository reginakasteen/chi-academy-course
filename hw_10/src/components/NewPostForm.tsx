import { Box, TextField, Button, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { newPostSchema, type NewPostSchema } from "../schemas/NewPostSchema";
import { useState } from "react";

interface NewPostFormProps {
  onSubmit: (data: NewPostSchema) => void;
}

const NewPostForm = ({ onSubmit }: NewPostFormProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <Formik
      initialValues={{ description: "", image: null as File | null }}
      validationSchema={toFormikValidationSchema(newPostSchema)}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        onSubmit(values);
        setSubmitting(false);
        resetForm();
        setPreview(null);
      }}
    >
      {({
        values,
        setFieldValue,
        handleChange,
        handleBlur,
        errors,
        touched,
        isSubmitting,
        resetForm,
      }) => (
        <Form>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              maxWidth: 400,
              mx: "auto",
              mt: 4,
            }}
          >
            <Typography variant="h5" textAlign="center">
              Create New Post
            </Typography>

            <TextField
              label="Description"
              name="description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              multiline
              rows={3}
              error={Boolean(errors.description && touched.description)}
              helperText={touched.description && errors.description ? errors.description : ""}
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  const file = e.target.files[0];
                  setFieldValue("image", file);
                  setPreview(URL.createObjectURL(file));
                }
              }}
            />
            {errors.image && touched.image && (
              <Typography color="error" variant="caption">
                {errors.image}
              </Typography>
            )}

            {preview && (
              <Box sx={{ mt: 1, textAlign: "center" }}>
                <Typography variant="subtitle2">Preview:</Typography>
                <img
                  src={preview}
                  alt="Preview"
                  style={{ width: "100%", maxHeight: 200, objectFit: "contain", borderRadius: 8 }}
                />
              </Box>
            )}

            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                fullWidth
              >
                Create Post
              </Button>

              <Button
                type="button"
                variant="outlined"
                color="secondary"
                onClick={() => {
                  resetForm();
                  setPreview(null);
                }}
                fullWidth
              >
                Reset
              </Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default NewPostForm;
