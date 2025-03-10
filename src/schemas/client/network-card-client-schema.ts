import { z } from "zod";

const NetworkCardSchema = z.object({
  name: z.string(),
  price: z.coerce.number(),
  protocol: z.string(),
  interface: z.string(),
  color: z.string(),
});

export default NetworkCardSchema;
