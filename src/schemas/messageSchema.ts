import { z } from "zod";

export const messageSchema = z.object({
  content: z
    .string()
    .min(10, { message: "content must be ten character" })
    .max(300, { message: " Content must be no longer then 300 charater" }),
});
