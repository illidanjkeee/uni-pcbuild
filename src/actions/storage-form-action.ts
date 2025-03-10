"use server";
import connectdb from "@/lib/connectdb";
import { z } from "zod";
import { storageClientSchema } from "@/schemas/client/storage-client-schema";
import Storage from "@/schemas/server/storage-server-schema";

export default async function StorageAction(
  data: z.infer<typeof storageClientSchema>,
  image: string
) {
  try {
    await connectdb();
    const res = await Storage.create({
      image,
      name: data.name,
      price: data.price,
      capacity: data.capacity,
      price_per_gb: data.price_per_gb,
      type: data.type,
      cache: data.cache,
      form_factor: data.form_factor,
      interface: data.interface,
    });
    console.log("server ", res);

    if (!res) {
      return false;
    }
    return true;
  } catch (error) {
    console.log("ERROR IN THE STORAGEFORM : ", error);
  }
}
