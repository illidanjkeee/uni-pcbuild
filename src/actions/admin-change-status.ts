"use server";
import mongoose from "mongoose";
import Admin from "@/schemas/server/admin-server-schema";
import connectdb from "@/lib/connectdb";
import { revalidatePath } from "next/cache";
export default async function adminChangeStatus(
  newStatus: string,
  buildID: string
) {
  try {
    await connectdb();

    await Admin.updateOne(
      { "orders.buildID": buildID },
      { $set: { "orders.$.status": newStatus } }
    );
    revalidatePath("/", "layout");
  } catch (error) {
    console.log(error);
  }
}
