"use server";
import connectdb from "@/lib/connectdb";
import User from "@/schemas/server/user-server-schema";
import { currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
export default async function deletePartFromBuild(
  partID: string,
  buildID: string
) {
  try {
    await connectdb();
    const user = await currentUser();
    const email = user?.emailAddresses[0].emailAddress;
    console.log(
      partID,
      buildID,
      email,
      "deletePartFromBuild&&&&&&&&&&&&&&&&&&&&&&&&7"
    );

    const res = await User.updateOne(
      { userEmail: email, "builds._id": buildID },
      {
        $pull: {
          "builds.$.parts": {
            partId: partID,
          },
        },
      }
    );
    if (!res) {
      return false;
    }
    revalidatePath("/", "layout");
    return true;
  } catch (error) {
    console.log("ERROR WHILE DELETING PART FROM BUILD :  ", error);
  }
}
