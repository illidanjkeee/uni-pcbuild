"use server";
import connectdb from "./connectdb";
import User from "@/schemas/server/user-server-schema";
import { currentUser } from "@clerk/nextjs";
export default async function createUser() {
  try {
    await connectdb();
    const user = await currentUser();
    const email = user?.emailAddresses[0].emailAddress;
    const isUserExist = await User.findOne({ userEmail: email });
    if (isUserExist) {
      console.log("USER EXISTS : CHECKED WHILE CREATING NEW BUILD");
      return;
    }
    console.log("USER NOT EXIST : CHECKED WHILE CREATING NEW BUILD");
    const res = await User.create({
      userEmail: email,
      image: user?.imageUrl,
      name: user?.firstName,
      builds: [],
    });
    if (!res) {
      console.log(
        "USER NOT CREATED SUCCESSFULLY : CHECKED WHILE CREATING NEW BUILD"
      );
      return;
    }
    console.log(
      "USER  CREATED SUCCESSFULLY : CHECKED WHILE CREATING NEW BUILD"
    );
  } catch (error) {
    console.log(
      "ERROR WHILE CREATING USER : CHECKED WHILE CREATING NEW BUILD",
      error
    );
  }
}
