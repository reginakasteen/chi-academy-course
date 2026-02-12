import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(4, "Username must be at least 4 characters")
    .max(20, "Username must be at most 20 characters"),
  password: z
    .string()
    .min(4, "Password must be at least 4 characters")
    .max(50, "Password must be at most 50 characters"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
