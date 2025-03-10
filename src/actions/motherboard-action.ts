"use server";
import connectdb from "@/lib/connectdb";
import { z } from "zod";
import { motherboardFormSchema } from "@/schemas/client/motherboard-client-schema";
import Motherboard from "@/schemas/server/motherboard-server-schema";

export default async function MotherboardAction(
  data: z.infer<typeof motherboardFormSchema>,
  image: string
) {
  try {
    await connectdb();
    const res = await Motherboard.create({
      image,
      name: data.name,
      price: data.price,
      socket: data.socket,
      form_factor: data.form_factor,
      max_memory: data.max_memory,
      memory_slots: data.memory_slots,
      color: data.color,
    });
    console.log("server ", res);

    if (!res) {
      return false;
    }
    return true;
  } catch (error) {
    console.log("ERROR IN THE MotherboardAction: ", error);
  }
}
