"use server";
import connectdb from "@/lib/connectdb";
import { z } from "zod";
import NetworkCardSchema from "@/schemas/client/network-card-client-schema";
import NetworkCard from "@/schemas/server/network-card-server-schema";

export default async function NetworkCardAction(
  data: z.infer<typeof NetworkCardSchema>,
  image: string
) {
  try {
    await connectdb();
    const res = await NetworkCard.create({
      image,
      name: data.name,
      price: data.price,
      protocol: data.protocol,
      interface: data.interface,
      color: data.color,
    });
    console.log("server ", res);

    if (!res) {
      return false;
    }
    return true;
  } catch (error) {
    console.log("ERROR IN THE NetworkCardForm : ", error);
  }
}
