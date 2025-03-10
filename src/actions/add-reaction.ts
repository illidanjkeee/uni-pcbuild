"use server";
import connectdb from "@/lib/connectdb";
import ShareBuilds from "@/schemas/server/share-build-server-schema";
import { currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

export default async function addReaction(
  reaction: string,
  sharedBuildID: string
) {
  try {
    await connectdb();
    const user = await currentUser();

    const reactionObj = {
      reaction,
      email: user?.emailAddresses[0].emailAddress,
      name: user?.firstName,
      image: user?.imageUrl,
    };

    const res = await ShareBuilds.updateOne(
      { _id: sharedBuildID },
      { $push: { reactions: reactionObj } }
    );
    if (!res) return false;
    revalidatePath("/", "layout");
    return true;
  } catch (error) {
    console.error(error);
  }
}
