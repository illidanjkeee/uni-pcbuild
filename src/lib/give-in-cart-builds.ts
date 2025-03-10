import { currentUser } from "@clerk/nextjs";
import connectdb from "./connectdb";
import User from "@/schemas/server/user-server-schema";

export default async function giveInCartBuilds() {
  try {
    const user = await currentUser();
    await connectdb();
    const res = await User.aggregate([
      {
        $match: {
          userEmail: user?.emailAddresses[0].emailAddress,
        },
      },
    {
        $unwind: "$builds",
      },
      {
        $match: {
          "builds.inCart": true,
        },
      },
    ]);
    if (!res) {
      return false;
    }
    console.log("fetching in cart builds", res);
    return res;
  } catch (error) {
    console.log("ERROR WHILE FETCHING IN CART BUILDS : ", error);
  }
}
