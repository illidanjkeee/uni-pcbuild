"use server";
import mongoose from "mongoose";
import Admin from "@/schemas/server/admin-server-schema";
import connectdb from "@/lib/connectdb";
import { revalidatePath } from "next/cache";

export default async function deleteOrder(buildID: string) {
  try {
    await connectdb();

    await Admin.updateOne(
      { name: "Aaron" },
      { $pull: { orders: { buildID: buildID } } }
    );
    revalidatePath("/", "layout");
  } catch (error) {
    console.log(error);
  }
}
