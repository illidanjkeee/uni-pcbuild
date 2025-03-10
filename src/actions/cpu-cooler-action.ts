"use server";
import connectdb from "@/lib/connectdb";
import { z } from "zod";
import { cpuCoolerFormSchema } from "@/schemas/client/cpu-cooler-client-schema";
import CpuCooler from "@/schemas/server/cpu-cooler-server-schema";

export default async function CPUCoolerAction(
  data: z.infer<typeof cpuCoolerFormSchema>,
  image: string,
  noiseLevelItems: string[] = [],
  rpmItems: string[] = []
) {
  try {
    await connectdb();
    const res = await CpuCooler.create({
      image,
      name: data.name,
      price: data.price,
      rpm: rpmItems,
      noise_level: noiseLevelItems,
      color: data.color,
      size: data.size,
    });
    console.log("server ", res);

    if (!res) {
      return false;
    }
    return true;
  } catch (error) {
    console.log("ERROR IN THE CPUCoolerAction: ", error);
  }
}
