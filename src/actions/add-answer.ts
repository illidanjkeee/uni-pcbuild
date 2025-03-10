"use server";
import connectdb from "@/lib/connectdb";
import Questions from "@/schemas/server/questions-server-schema";
import { currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

export default async function addAnswer(answer: string, questionId: string) {
  try {
    await connectdb();
    const user = await currentUser();

    const ansObj = {
      answer: answer,
      email: user?.emailAddresses[0].emailAddress,
      name: user?.firstName,
      image: user?.imageUrl,
    };

    const res = await Questions.updateOne(
      { _id: questionId },
      { $push: { answers: ansObj } }
    );
    if (!res) return false;
    revalidatePath("/", "layout");
    return true;
  } catch (error) {
    console.error(error);
  }
}
