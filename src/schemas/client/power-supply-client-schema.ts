import { z } from "zod";

export const powerSupplyClientSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  price: z.coerce.number(),
  type: z.string().min(2, {
    message: "Type must be at least 2 characters.",
  }),
  efficiency: z.string().min(2, {
    message: "Efficiency must be at least 2 characters.",
  }),
  wattage: z.coerce.number(),
  modular: z.string().min(2, {
    message: "Modular must be at least 2 characters.",
  }),
  color: z.string().min(2, {
    message: "Color must be at least 2 characters.",
  }),
});
