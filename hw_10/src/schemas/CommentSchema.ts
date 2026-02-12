import { z } from "zod";


export const commentSchema = z.object({
  text: z
    .string()
    .min(1, "Comment cannot be empty")
    .max(300, "Comment must be at most 300 characters"),
});

export type CommentSchema = z.infer<typeof commentSchema>;