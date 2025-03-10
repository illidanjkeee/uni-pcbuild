"use server";
import connectdb from "@/lib/connectdb";
import { z } from "zod";
import { graphicsCardFormSchema } from "@/schemas/client/graphics-card-client-schema";
import GraphicsCard from "@/schemas/server/graphics-card-server-schema";

export default async function GraphicsCardAction(
  data: z.infer<typeof graphicsCardFormSchema>,
  image: string
) {
  try {
    await connectdb();
    const res = await GraphicsCard.create({
      image,
      name: data.name,
      price: data.price,
      chipset: data.chipset,
      memory: data.memory,
      core_clock: data.core_clock,
      boost_clock: data.boost_clock,
      color: data.color,
      length: data.length,
    });
    console.log("server ", res);

    if (!res) {
      return false;
    }
    return true;
  } catch (error) {
    console.log("ERROR IN THE GraphicsCardAction: ", error);
  }
}
