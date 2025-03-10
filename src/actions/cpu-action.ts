"use server";
import connectdb from "@/lib/connectdb";
import { z } from "zod";
import { cpuClientSchema } from "@/schemas/client/cpu-client-schema";
import CPU from "@/schemas/server/cpu-server-schema";

export default async function CpuAction(
  data: z.infer<typeof cpuClientSchema>,
  image: string
) {
  try {
    await connectdb();
    const res = await CPU.create({
      image,
      name: data.name,
      price: data.price,
      core_count: data.core_count,
      core_clock: data.core_clock,
      boost_clock: data.boost_clock,
      tdp: data.tdp,
      graphics: data.graphics,
      smt: data.smt,
    });
    console.log("server ", res);

    if (!res) {
      return false;
    }
    return true;
  } catch (error) {
    console.log("ERROR IN THE CPUFORM : ", error);
  }
}
