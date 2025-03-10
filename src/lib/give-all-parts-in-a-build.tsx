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

export default async function giveAllPartsInAbuild(buildId: string) {
  try {
    await connectdb();

    const user = await currentUser();
    let allPartsArray: any = [];
    const builds = await User.aggregate([
      {
        $match: {
          userEmail: user?.emailAddresses[0].emailAddress,
        },
      },
      {
        $unwind: "$builds", // Unwind the builds array
      },
      {
        $match: {
          "builds._id": new ObjectId(buildId),
        },
      },
      {
        $project: {
          build: "$builds", // Project the matched build
        },
      },
    ]);
    if (builds.length === 0) {
      return [];
    }
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

    const parts = builds[0].build.parts;

    const loopOverBuildParts = async () => {
      await Promise.all(
        parts.map(async (element: any) => {
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

    await loopOverBuildParts();

    return allPartsArray;
  } catch (error) {
    console.log("ERROR WHILE FETCHING PARTS OF A BUILD :  ", error);
  }
}
