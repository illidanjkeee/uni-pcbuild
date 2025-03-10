import connectdb from "./connectdb";
import User from "@/schemas/server/user-server-schema";

export default async function giveAllUsersCheckoutBuilds() {
  try {
    await connectdb();
    const res = await User.aggregate([
      {
        $unwind: "$builds",
      },
      {
        $match: {
          "builds.status": {
            $in: ["checkout", "disapprove", "shipped"], // Match any of these statuses
          },
        },
      },
      {
        $project: {
          _id: 0, // Exclude the default _id field
          userEmail: 1, // Include userEmail
          builds: "$builds", // Include builds
        },
      },
    ]);

    if (!res) {
      return [];
    }
    return res;
  } catch (error) {
    console.log("ERROR WHILE FETCHING CHECKOUT BUILDS : ", error);
    return [];
  }
}
