"use client";

import ReactionForm from "./forms/reaction-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type QuestionDisplayCardPropsT = {
  name: string;
  question: string;
  image: string;
  email: string;
  questionID: string;
  children?: React.ReactNode;
};

export default function QuestionDisplayCard({
  name,
  question,
  image,
  email,
  questionID,
  children,
}: QuestionDisplayCardPropsT) {
  return (
    <div className="border rounded-md">
      <div className="  flex bg-primary rounded-md p-3 text-white w-full flex-col ">
        <div className="flex sm:flex-row flex-col sm:gap-10 gap-5 mb-5 sm:mb-0">
          <div className="flex gap-4 items-center">
            <Avatar className="w-8 h-8">
              <AvatarImage src={image} alt="image" />
              <AvatarFallback>CC</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium text-sm">{name}</div>
              <div className="text-[0.75rem]">{email}</div>
            </div>
          </div>
          <div className="text-lg ">{question}</div>
        </div>

        <div className="w-full  flex justify-end">
          <ReactionForm
            buttonName="answer"
            purpose="questions"
            questionID={questionID}
          ></ReactionForm>
        </div>
      </div>
      {children}
    </div>
  );
}
