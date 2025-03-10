import { z } from "zod";

export const motherboardFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters long.",
  }),
  price: z.coerce.number(),
  socket: z.string().min(2, {
    message: "Socket must be at least 2 characters long.",
  }),
  form_factor: z.string().min(2, {
    message: "Form factor must be at least 2 characters long.",
  }),
  max_memory: z.coerce.number(),
  memory_slots: z.coerce.number(),
  color: z.string(),
});
