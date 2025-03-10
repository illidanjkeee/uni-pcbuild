"use server";
import connectdb from "@/lib/connectdb";
import { z } from "zod";
import { powerSupplyClientSchema } from "@/schemas/client/power-supply-client-schema";
import PowerSupply from "@/schemas/server/power-supply-server-schema";

export default async function PowerSupplyAction(
  data: z.infer<typeof powerSupplyClientSchema>,
  image: string
) {
  try {
    await connectdb();
    const res = await PowerSupply.create({
      image,
      name: data.name,
      price: data.price,
      type: data.type,
      efficiency: data.efficiency,
      wattage: data.wattage,
      modular: data.modular,
      color: data.color,
    });
    console.log("server ", res);

    if (!res) {
      return false;
    }
    return true;
  } catch (error) {
    console.log("ERROR IN THE POWERSUPPLYFORM : ", error);
  }
}
