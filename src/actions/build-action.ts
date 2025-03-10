"use server";
import { z } from "zod";
import User from "@/schemas/server/user-server-schema";
import connectdb from "@/lib/connectdb";
import { buildClientSchema } from "@/schemas/client/build-client-schema";
import { currentUser } from "@clerk/nextjs";
import createUser from "@/lib/createUser";
import { revalidatePath } from "next/cache";
export default async function BuildAction(
  data: z.infer<typeof buildClientSchema>,
  isWithPayload?: boolean,
  payload?: any
) {
  try {
    if (isWithPayload) {
      const user = await currentUser();
      await connectdb();
      await createUser();
      const res = await User.findOneAndUpdate(
        { userEmail: user?.emailAddresses[0].emailAddress },
        {
          $push: {
            builds: {
              name: data.name,
              parts: payload,
            },
          },
        }
      );

      if (!res) {
        return false;
      }
      revalidatePath("/", "layout");
      return true;
    } else {
      const user = await currentUser();
      await connectdb();
      await createUser();
      const res = await User.findOneAndUpdate(
        { userEmail: user?.emailAddresses[0].emailAddress },
        {
          $push: {
            builds: {
              name: data.name,
              parts: [],
            },
          },
        }
      );

      if (!res) {
        return false;
      }
      revalidatePath("/", "layout");
      return true;
    }
  } catch (error) {
    console.log("ERROR WHILE CREATING A BUILD : ", error);
  }
}
