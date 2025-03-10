import { z } from "zod";

export const cpuClientSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters long.",
  }),
  price: z.coerce.number(),
  core_count: z.coerce.number(),
  core_clock: z.coerce.number(),
  boost_clock: z.coerce.number(),
  tdp: z.coerce.number(),
  graphics: z.string().min(2, {
    message: "Graphics must be at least 2 characters long.",
  }),
  smt: z.string().min(2, { message: "SMT must be at least 2 characters long." }),
});
