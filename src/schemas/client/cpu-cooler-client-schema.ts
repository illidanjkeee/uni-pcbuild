import { z } from "zod";

export const cpuCoolerFormSchema = z.object({
  name: z.string().min(2).default(""),
  price: z.coerce.number().default(0),
  color: z.string().default(""),
  size: z.coerce.number().default(0),
});
