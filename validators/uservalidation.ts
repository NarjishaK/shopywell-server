import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(5, "Password must be at least 5 characters long"),
  addresses: z
    .array(
      z.object({
        street: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        zip: z.string().optional(),
        country: z.string().optional(),
      })
    )
    .optional(),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || val.toString().length === 10, {
      message: "Phone number must be 10 digits long",
    }),
});

export type User = z.infer<typeof userSchema>;
