import { z } from "zod";

export const graphicsCardFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters long.",
  }),
  price: z.coerce.number(),
  chipset: z.string().min(2, {
    message: "Chipset must be at least 2 characters long.",
  }),
  memory: z.coerce.number(),
  core_clock: z.coerce.number(),
  boost_clock: z.coerce.number(),
  color: z.string(),
  length: z.coerce.number(),
});
