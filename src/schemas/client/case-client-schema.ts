import { z } from "zod";

export const caseClientSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  price: z.coerce.number(),
  type: z.string().min(2, {
    message: "Type must be at least 2 characters.",
  }),
  color: z.string().min(2, {
    message: "Color must be at least 2 characters.",
  }),
  psu: z.string(),
  side_panel: z.string().min(2, {
    message: "Color must be at least 2 characters.",
  }),
  external_volume: z.coerce.number(),
  internal_35_bays: z.coerce.number(),
});
