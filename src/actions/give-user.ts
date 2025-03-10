"use server";
import connectdb from "@/lib/connectdb";
import User from "@/schemas/server/user-server-schema";
export default async function giveUser() {
  try {
    await connectdb();
    const res = await User.find({});
    return res;
  } catch (error) {
    console.log(error);
  }
}
