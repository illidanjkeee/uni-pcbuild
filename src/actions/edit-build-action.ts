"use server";
import connectdb from "@/lib/connectdb";
import User from "@/schemas/server/user-server-schema";
import { currentUser } from "@clerk/nextjs";
import { z } from "zod";
import { editBuildClientSchema } from "@/components/forms/edit-build-form";
import { revalidatePath } from "next/cache";
export default async function editBuildAction(
  data: z.infer<typeof editBuildClientSchema>
) {
  try {
    await connectdb();
    const user = await currentUser();
    const res = await User.findOneAndUpdate(
      { userEmail: user?.emailAddresses[0].emailAddress },
      {
        $set: { builds: { name: data.newBuildName } },
      }
    );
    if (!res) {
      return false;
    }
    revalidatePath("/", "layout");
    return true;
  } catch (error) {
    console.log("ERROR WHIEL EDITIN BUILD NAME :", error);
  }
}
