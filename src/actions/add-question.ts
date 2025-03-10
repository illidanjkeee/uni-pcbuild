"use server";
import connectdb from "@/lib/connectdb";
import createUser from "@/lib/createUser";
import Questions from "@/schemas/server/questions-server-schema";
import { currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
export default async function addQuestion(question: string) {
  try {
    await connectdb();
    await createUser();
    const user = await currentUser();

    const res = await Questions.create({
      question,
      email: user?.emailAddresses[0].emailAddress,
      name: user?.firstName,
      image: user?.imageUrl,
      answers: [],
    });
    if (!res) {
      return false;
    }
    revalidatePath("/", "layout");
    return true;
  } catch (error) {
    console.log(error);
  }
}
