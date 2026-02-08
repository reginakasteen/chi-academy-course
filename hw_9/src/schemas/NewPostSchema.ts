import { z } from "zod";

export const newPostSchema = z.object({
  description: z
    .string()
    .min(2, "Description must be at least 2 characters")
    .max(200, "Description must be at most 2000 characters"),
  image: z
    .any()
    .refine((file) => file instanceof File, "Image is required")
    .refine((file) => file?.size <= 5_000_000, "Image must be less than 5MB")
    .refine(
      (file: File) =>
        file && ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(file.type),
      "Only JPEG, PNG, WEBP or GIF images are allowed"
    ),
});

export type NewPostSchema = z.infer<typeof newPostSchema>;
