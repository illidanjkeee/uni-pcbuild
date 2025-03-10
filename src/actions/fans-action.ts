"use server";
import connectdb from "@/lib/connectdb";
import { z } from "zod";
import { fanFormSchema } from "@/schemas/client/fans-client-schema";
import Fan from "@/schemas/server/fans-server-schema";
export default async function FansAction(
  data: z.infer<typeof fanFormSchema>,
  image: string,
  rpmItems: string[] = []
) {
  try {
    await connectdb();
    const res = await Fan.create({
      image,
      name: data.name,
      price: data.price,
      size: data.size,
      color: data.color,
      rpm: rpmItems,
      airflow: data.airflow,
      noise_level: data.noise_level,
      pwm: data.pwm,
    });
    console.log("server ", res);

    if (!res) {
      return false;
    }
    return true;
  } catch (error) {
    console.log("ERROR IN THE FansAction: ", error);
  }
}
