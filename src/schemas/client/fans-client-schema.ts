import { z } from "zod";

export const fanFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters long.",
  }),
  price: z.coerce.number(),
  size: z.coerce.number(),
  color: z.string(),

  airflow: z.coerce.number(),
  noise_level: z.coerce.number(),
  pwm: z.string(),
});
