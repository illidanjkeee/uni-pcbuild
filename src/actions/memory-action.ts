"use server";
import connectdb from "@/lib/connectdb";
import { z } from "zod";
import { memoryFormSchema } from "@/schemas/client/memory-client-schema";
import Memory from "@/schemas/server/memory-server-schema";

export default async function MemoryAction(
  data: z.infer<typeof memoryFormSchema>,
  image: string,
  speedItems: string[] = [],
  modulesItems: string[] = []
) {
  try {
    await connectdb();
    const res = await Memory.create({
      image,
      name: data.name,
      price: data.price,
      speed: speedItems,
      modules: modulesItems,
      price_per_gb: data.price_per_gb,
      color: data.color,
      first_word_latency: data.first_word_latency,
      cas_latency: data.cas_latency,
    });
    console.log("server ", res);

    if (!res) {
      return false;
    }
    return true;
  } catch (error) {
    console.log("ERROR IN THE MemoryAction: ", error);
  }
}
