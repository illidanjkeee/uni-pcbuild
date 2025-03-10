import connectdb from "@/lib/connectdb";
import Admin from "@/schemas/server/admin-server-schema";
import User from "@/schemas/server/user-server-schema";
import total from "@/lib/total";
import giveAllPartsInAbuild from "@/lib/give-all-parts-in-a-build";
import build from "next/dist/build";
const handleBillSummation = async (buildId: string) => {
  const parts = await giveAllPartsInAbuild(buildId);
  return total(parts);
};

async function getBuildByEmailAndId(userEmail: string, buildId: string) {
  let user = await User.findOne({ userEmail: userEmail });

  if (!user) {
    return "User not found";
  }

  let build = user.builds.find(
    (build: any) => build._id.toString() === buildId
  );

  if (!build) {
    return "Build not found";
  }

  return {
    userEmail: userEmail,
    build: build,
  };
}

export default async function getOrderStatuses() {
  try {
    let statusArray: any = [];
    await connectdb();
    const admins = await Admin.find({ name: "Aaron" });
    const orders = admins[0].orders;
    // for (let i = 0; i < orders.length; i++) {
    //   const userBuild = await User.find({
    //     userEmail: orders[i].customerEmail,
    //     buildID: orders[i].buildID,
    //   });
    //   {
    //     statusArray.push({
    //       orderID: orders[i].orderID,
    //       customerEmail: orders[i].customerEmail,
    //       buildID: orders[i].buildID,
    //       status: userBuild[0].status,
    //       bill: total(userBuild[0].parts),
    //     });
    //   }
    // }

    for (let i = 0; i < orders.length; i++) {
      const userBuild = await getBuildByEmailAndId(
        orders[i].customerEmail,
        orders[i].buildID
      );

      if (typeof userBuild === "object") {
        statusArray.push({
          email: userBuild.userEmail,
          buildID: userBuild.build._id,
          status: userBuild.build.status,
          parts: userBuild.build.parts,
          buildName: userBuild.build.name,
        });
      } else {
        console.error(userBuild); // Log the error message
      }
    }
    return statusArray;
  } catch (error) {
    console.log(error);
  }
}
