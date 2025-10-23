import { z } from "zod/v4";

export const FallbackValidation = z.object({
  messages: z
    .string()
    .max(1000, "Message is too long")
    .min(1, "Message is required"),
});
