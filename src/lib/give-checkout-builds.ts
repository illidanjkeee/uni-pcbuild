"use server";
import mongoose from "mongoose";
import Admin from "@/schemas/server/admin-server-schema";
import connectdb from "@/lib/connectdb";
import { currentUser } from "@clerk/nextjs";

export default async function giveCheckoutBuilds() {
  try {
    await connectdb();
    const user = await currentUser();

    const admin = await Admin.findOne({ name: "Aaron" });
    if (!admin) {
      throw new Error("Admin not found");
    }

    const customerOrders = admin.orders.filter(
      (order: any) => order.mail === user?.emailAddresses[0].emailAddress
    );
    return customerOrders;
  } catch (error) {
    console.log(error);
  }
}

// "use server";

// import { currentUser } from "@clerk/nextjs";
// import connectdb from "./connectdb";
// import User from "@/schemas/server/user-server-schema";

// export default async function giveCheckoutBuilds() {
//   try {
//     const user = await currentUser();
//     await connectdb();
//     const res = await User.aggregate([
//       {
//         $match: {
//           userEmail: user?.emailAddresses[0].emailAddress,
//         },
//       },
//       {
//         $unwind: "$builds",
//       },
//       {
//         $match: {
//           "builds.status": "checkout",
//         },
//       },
//     ]);
//     if (!res) {
//       return [];
//     }
//     return res;
//   } catch (error) {
//     console.log("ERROR WHILE FETCHING CHECKOUT BUILDS : ", error);
//   }
// }
