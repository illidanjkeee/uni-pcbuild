"use server";

import connectdb from "@/lib/connectdb";
import User from "@/schemas/server/user-server-schema";
import { currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

export default async function addToBuildAction(
  partId: string,
  partType: string,
  buildId: string
) {
  try {
    console.log(
      typeof partId,
      typeof partType,
      buildId,
      "in the server component"
    );
    await connectdb();

    const user = await currentUser();
    const updatedUser = await User.findOneAndUpdate(
      {
        userEmail: user?.emailAddresses[0].emailAddress,
        "builds._id": buildId,
      },
      {
        $push: {
          "builds.$.parts": {
            partId,
            partType,
          },
        },
      },
      { new: true }
    );
    if (!updatedUser) {
      return false;
    }
    revalidatePath("/", "layout");
    return true;
  } catch (error) {
    console.log("ERROR IN ADD TO BUILD FORM", error);
    throw error; // Rethrow the error to propagate it further
  }
}
