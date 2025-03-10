import { z } from "zod";

export const storageClientSchema = z.object({
  name: z.string(),
  price: z.coerce.number(),
  capacity: z.coerce.number(),
  price_per_gb: z.coerce.number(),
  cache: z.coerce.number(),
  type: z.string(),
  form_factor: z.string(),
  interface: z.string(),
});
