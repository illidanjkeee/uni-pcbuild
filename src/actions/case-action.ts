"use server";
import connectdb from "@/lib/connectdb";
import { z } from "zod";
import { caseClientSchema } from "@/schemas/client/case-client-schema";
import Case from "@/schemas/server/case-server-schema";

export default async function CaseAction(
  data: z.infer<typeof caseClientSchema>,
  image: string
) {
  try {
    await connectdb();
    const res = await Case.create({
      image,
      name: data.name,
      price: data.price,
      type: data.type,
      color: data.color,
      psu: data.psu,
      side_panel: data.side_panel,
      external_volume: data.external_volume,
      internal_35_bays: data.internal_35_bays,
    });
    console.log("serever ", res);

    if (!res) {
      return false;
    }
    return true;
  } catch (error) {
    console.log("ERROR IN THE CASEFORM : ", error);
  }
}
