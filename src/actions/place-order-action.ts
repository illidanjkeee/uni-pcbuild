"use server";

import Admin from "@/schemas/server/admin-server-schema";
import { currentUser } from "@clerk/nextjs";
import connectdb from "@/lib/connectdb";
import giveAllPartsInAbuild from "@/lib/give-all-parts-in-a-build";
import total from "@/lib/total";
import getBuildByEmailAndId from "./get-build-by-email-and-build-id";
import { revalidatePath } from "next/cache";
export default async function placeOrderAction(buildID: string) {
  console.log("place order build ID 3333333333333333333333", buildID);
  try {
    await connectdb();

    const user = await currentUser();
    const email = user?.emailAddresses[0].emailAddress;

    if (!email) {
      return;
    }

    const res = await getBuildByEmailAndId(
      user?.emailAddresses[0].emailAddress,
      buildID
    );

    if (res === false) {
      return;
    }

    const newBuild = {
      mail: user?.emailAddresses[0].emailAddress,
      buildName: res.build.name,
      bill: total(await giveAllPartsInAbuild(res.build._id.toString())),
      parts: res.build.parts,
      status: res.build.status,
      buildID: res.build._id.toString(),
    };

    console.log("build from place order action", res);

    const admin = await Admin.findOne({ name: "Aaron" });
    console.log("admin43333333333333333333", admin);
    if (!admin) {
      await Admin.create({ name: "Aaron" });
    }
    await Admin.findOneAndUpdate(
      { name: "Aaron" },
      {
        $push: {
          orders: newBuild,
        },
      }
    );
    revalidatePath("/", "layout");
  } catch (error) {
    console.log(error);
  }
}
