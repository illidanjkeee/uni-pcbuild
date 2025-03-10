"use server";
import connectdb from "./connectdb";
import { ObjectId } from "mongodb";
import User from "@/schemas/server/user-server-schema";
import Case from "@/schemas/server/case-server-schema";
import { currentUser } from "@clerk/nextjs";
import Cpu from "@/schemas/server/cpu-server-schema";
import GraphicsCard from "@/schemas/server/graphics-card-server-schema";
import Memory from "@/schemas/server/memory-server-schema";
import Motherboard from "@/schemas/server/motherboard-server-schema";
import PowerSupply from "@/schemas/server/power-supply-server-schema";
import Storage from "@/schemas/server/storage-server-schema";
import Fan from "@/schemas/server/fans-server-schema";
import NetworkCard from "@/schemas/server/network-card-server-schema";
import CpuCooler from "@/schemas/server/cpu-cooler-server-schema";

/**
 * Fetches all parts in a specified build by buildId
 * @param buildId - The ID of the build to fetch parts for
 * @returns Array of parts in the build or empty array if build not found
 */
export default async function giveAllPartsInAbuild(buildId: string) {
  try {
    // Connect to the database
    await connectdb();

    // Get the current authenticated user
    const user = await currentUser();
    let allPartsArray: any = [];
    
    // Fetch the specific build from the user's builds array using aggregation
    const builds = await User.aggregate([
      {
        $match: {
          userEmail: user?.emailAddresses[0].emailAddress,
        },
      },
      {
        $unwind: "$builds", // Unwind the builds array to work with individual builds
      },
      {
        $match: {
          "builds._id": new ObjectId(buildId),
        },
      },
      {
        $project: {
          build: "$builds", // Project only the matched build
        },
      },
    ]);
    
    // Return empty array if no build found
    if (builds.length === 0) {
      return [];
    }
    
    // Helper functions to find different part types and add them to allPartsArray
    const findCasePart = async (id: string) => {
      const res = await Case.findOne({ _id: new ObjectId(id) });
      await allPartsArray.push({ ...res._doc, partType: "case" });
    };

    const findCpuPart = async (id: string) => {
      const res = await Cpu.findOne({ _id: new ObjectId(id) });
      await allPartsArray.push({ ...res._doc, partType: "cpu" });
    };

    const findGraphicsCardPart = async (id: string) => {
      const res = await GraphicsCard.findOne({ _id: new ObjectId(id) });
      await allPartsArray.push({ ...res._doc, partType: "graphics-card" });
    };

    const findMemoryPart = async (id: string) => {
      const res = await Memory.findOne({ _id: new ObjectId(id) });
      await allPartsArray.push({ ...res._doc, partType: "memory" });
    };

    const findMotherboardPart = async (id: string) => {
      const res = await Motherboard.findOne({ _id: new ObjectId(id) });
      await allPartsArray.push({ ...res._doc, partType: "motherboard" });
    };

    const findPowerSupplyPart = async (id: string) => {
      const res = await PowerSupply.findOne({ _id: new ObjectId(id) });
      await allPartsArray.push({ ...res._doc, partType: "power-supply" });
    };

    const findStoragePart = async (id: string) => {
      const res = await Storage.findOne({ _id: new ObjectId(id) });
      await allPartsArray.push({ ...res._doc, partType: "storage" });
    };

    const findFanPart = async (id: string) => {
      const res = await Fan.findOne({ _id: new ObjectId(id) });
      await allPartsArray.push({ ...res._doc, partType: "fan" });
    };

    const findNetworkCardPart = async (id: string) => {
      const res = await NetworkCard.findOne({ _id: new ObjectId(id) });
      await allPartsArray.push({ ...res._doc, partType: "network-card" });
    };

    const findCpuCoolerPart = async (id: string) => {
      const res = await CpuCooler.findOne({ _id: new ObjectId(id) });
      await allPartsArray.push({ ...res._doc, partType: "cpu-cooler" });
    };

    // Extract parts from the found build
    const parts = builds[0].build.parts;

    // Process all parts in the build concurrently
    const loopOverBuildParts = async () => {
      await Promise.all(
        parts.map(async (element: any) => {
          // Use appropriate finder function based on part type
          switch (element.partType) {
            case "Cpu":
              await findCpuPart(element.partId);
              break;
            case "graphics-card":
              await findGraphicsCardPart(element.partId);
              break;
            case "memory":
              await findMemoryPart(element.partId);
              break;
            case "motherboard":
              await findMotherboardPart(element.partId);
              break;
            case "power-supply":
              await findPowerSupplyPart(element.partId);
              break;
            case "storage":
              await findStoragePart(element.partId);
              break;
            case "fan":
              await findFanPart(element.partId);
              break;
            case "case":
              await findCasePart(element.partId);
              break;
            case "network-card":
              await findNetworkCardPart(element.partId);
              break;
            case "cpu-cooler":
              await findCpuCoolerPart(element.partId);
              break;
          }
        })
      );
    };

    // Execute part fetching
    await loopOverBuildParts();

    // Return the array of all parts in the build
    return allPartsArray;
  } catch (error) {
    // Log any errors that occur during the process
    console.log("ERROR WHILE FETCHING PARTS OF A BUILD :  ", error);
  }
}
