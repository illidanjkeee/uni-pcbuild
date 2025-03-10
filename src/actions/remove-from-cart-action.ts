"use server";
import connectdb from "@/lib/connectdb";
import { currentUser } from "@clerk/nextjs";
import User from "@/schemas/server/user-server-schema";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
export default async function removeFromCartAction(buildID: string) {
  try {
    await connectdb();
    const user = await currentUser();

    const result = await User.updateOne(
      {
        userEmail: user?.emailAddresses[0].emailAddress,
        "builds._id": new ObjectId(buildID),
      },
      { $set: { "builds.$.inCart": false } }
    );

    if (result.modifiedCount === 0) {
      return false;
    }

    revalidatePath("/", "layout");
    return true;
  } catch (error) {
    console.error("Error while putting build in cart:", error);
    return false;
  }
}
