"use server";

import connectdb from "@/lib/connectdb";
import User from "@/schemas/server/user-server-schema";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
export default async function deleteBuildAction(buildId: string) {
  try {
    const user = await currentUser();
    await connectdb();
    const updatedUser = await User.findOneAndUpdate(
      { userEmail: user?.emailAddresses[0].emailAddress },
      { $pull: { builds: { _id: buildId } } },
      { new: true }
    );
    if (!updatedUser) {
      return false;
    }
    revalidatePath("/", "layout");
    return true;
  } catch (error) {
    console.log("ERROR WHILE DELETING BUILD ", error);
  }
}
