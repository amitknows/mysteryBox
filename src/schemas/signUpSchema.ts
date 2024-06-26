import { z } from "zod";

export const usernameValidatation = z
  .string()
  .min(2, "Username must be atleast two characters")
  .max(20, "Username must no more then 20 character")
  .regex(/^[a-zA-Z0-9_]+$/, "username must not contain special character");

export const signUpSchema = z.object({
  username: usernameValidatation,
  email: z.string().email({ message: "invalid email address" }),
  password: z
    .string()
    .min(6, { message: "password must be atleast 6 characters" }),
});
