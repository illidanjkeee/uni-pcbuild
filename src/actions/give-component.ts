"use server";
import connectdb from "@/lib/connectdb";
import { currentUser } from "@clerk/nextjs";
import Cpu from "@/schemas/server/cpu-server-schema";
import Case from "@/schemas/server/case-server-schema";
import CpuCooler from "@/schemas/server/cpu-cooler-server-schema";
import NetworkCard from "@/schemas/server/network-card-server-schema";
import PowerSupply from "@/schemas/server/power-supply-server-schema";
import Motherboard from "@/schemas/server/motherboard-server-schema";
import Memory from "@/schemas/server/memory-server-schema";
import Fans from "@/schemas/server/fans-server-schema";
import GraphicsCard from "@/schemas/server/graphics-card-server-schema";
import Storage from "@/schemas/server/storage-server-schema";
import mongoose from "mongoose";
export default async function giveComponent(partID: string, category: string) {
  try {
    console.log(partID, "partID");
    await connectdb();
    const user = await currentUser();
    const email = user?.emailAddresses[0].emailAddress;
    console.log(email, "email");
    let res;
    switch (category) {
      case "case":
        res = await Case.findOne({ _id: partID });
        console.log(res);
        console.log("caseeeeeeeeeeeeee");
        if (res) {
          const plainObject = res.toObject();
          plainObject._id = plainObject._id.toString(); // Convert _id to a string
          return plainObject;
        } else {
          return null;
        }
      case "Cpu":
        res = await Cpu.findOne({ _id: partID });
        return res;
      case "cpu-cooler":
        res = await CpuCooler.findOne({ _id: partID });
        if (res) {
          const plainObject = res.toObject();
          plainObject._id = plainObject._id.toString(); // Convert _id to a string
          return plainObject;
        } else {
          return null;
        }

      case "network-card":
        res = await NetworkCard.findOne({ _id: partID });
        if (res) {
          const plainObject = res.toObject();
          plainObject._id = plainObject._id.toString(); // Convert _id to a string
          return plainObject;
        } else {
          return null;
        }
      case "power-supply":
        res = await PowerSupply.findOne({ _id: partID });
        if (res) {
          const plainObject = res.toObject();
          plainObject._id = plainObject._id.toString(); // Convert _id to a string
          return plainObject;
        } else {
          return null;
        }
      case "motherboard":
        res = await Motherboard.findOne({ _id: partID });
        if (res) {
          const plainObject = res.toObject();
          plainObject._id = plainObject._id.toString(); // Convert _id to a string
          return plainObject;
        } else {
          return null;
        }
      case "memory":
        res = await Memory.findOne({ _id: partID });
        if (res) {
          const plainObject = res.toObject();
          plainObject._id = plainObject._id.toString(); // Convert _id to a string
          return plainObject;
        } else {
          return null;
        }
      case "fans":
        res = await Fans.findOne({ _id: partID });
        if (res) {
          const plainObject = res.toObject();
          plainObject._id = plainObject._id.toString(); // Convert _id to a string
          return plainObject;
        } else {
          return null;
        }
      case "graphics-card":
        res = await GraphicsCard.findOne({ _id: partID });
        if (res) {
          const plainObject = res.toObject();
          plainObject._id = plainObject._id.toString(); // Convert _id to a string
          return plainObject;
        } else {
          return null;
        }
      case "storage":
        res = await Storage.findOne({ _id: partID });
        if (res) {
          const plainObject = res.toObject();
          plainObject._id = plainObject._id.toString(); // Convert _id to a string
          return plainObject;
        } else {
          return null;
        }
      default:
        return null;
    }
  } catch (error) {
    console.log(error);
  }
}
