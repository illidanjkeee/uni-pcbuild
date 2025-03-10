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
import { revalidatePath } from "next/cache";
import { Network } from "lucide-react";
export default async function deleteComponent(
  partID: string,
  category: string
) {
  try {
    console.log(partID, "partID");
    await connectdb();
    const user = await currentUser();
    const email = user?.emailAddresses[0].emailAddress;
    console.log(email, "email");
    let res;
    switch (category) {
      case "case":
        res = await Case.deleteOne({ _id: partID });
        if (!res) return false;
        revalidatePath("/", "page");
        return true;

      case "Cpu":
        res = await Cpu.deleteOne({ _id: partID });
        if (!res) return false;
        revalidatePath("/", "page");
        return true;
      case "cpu-cooler":
        res = await CpuCooler.deleteOne({ _id: partID });
        if (!res) return false;
        revalidatePath("/", "page");
        return true;

      case "network-card":
        res = await NetworkCard.deleteOne({ _id: partID });
        if (!res) return false;
        revalidatePath("/", "page");
        return true;
      case "power-supply":
        res = await PowerSupply.deleteOne({ _id: partID });
        if (!res) return false;
        revalidatePath("/", "page");
        return true;
      case "motherboard":
        res = await Motherboard.deleteOne({ _id: partID });
        if (!res) return false;
        revalidatePath("/", "page");
        return true;
      case "memory":
        res = await Memory.deleteOne({ _id: partID });
        if (!res) return false;
        revalidatePath("/", "page");
        return true;
      case "fans":
        res = await Fans.deleteOne({ _id: partID });
        if (!res) return false;
        revalidatePath("/", "page");
        return true;
      case "graphics-card":
        res = await GraphicsCard.deleteOne({ _id: partID });
        if (!res) return false;
        revalidatePath("/", "page");
        return true;
      case "storage":
        res = await Storage.deleteOne({ _id: partID });
        if (!res) return false;
        revalidatePath("/", "page");
        return true;
      default:
        return null;
    }
  } catch (error) {
    console.log(error);
  }
}
