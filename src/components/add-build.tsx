"use server";
import { currentUser } from "@clerk/nextjs";
import ShareBuilds from "@/schemas/server/share-build-server-schema";
import connectdb from "@/lib/connectdb";
import createUser from "@/lib/createUser";
import { revalidatePath } from "next/cache";
export default async function addBuildAction(
  buildID: string,
  buildName: string,
  parts: any
) {
  try {
    await connectdb();
    await createUser();
    const user = await currentUser();

    const res = await ShareBuilds.create({
      buildID,
      buildName,
      parts,
      email: user?.emailAddresses[0].emailAddress,
      name: user?.firstName,
      image: user?.imageUrl,
      reactions: [],
    });
    if (!res) {
      return false;
    }
    revalidatePath("/", "layout");
    return true;
  } catch (error) {
    console.log(error);
  }
}
