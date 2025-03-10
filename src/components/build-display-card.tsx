"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ReactionForm from "./forms/reaction-form";
import Link from "next/link";

type BuildDisplayCardPropsT = {
  image: string;
  buildName: string;
  parts: any;
  email: string;
  name: string;
  sharedBuildID: string;
  children?: React.ReactNode;
  buildID: string;
};
export default function BuildDisplayCard({
  image,
  buildName,
  parts,
  email,
  name,
  sharedBuildID,
  children,
  buildID,
}: BuildDisplayCardPropsT) {
  return (
    <div className="border rounded-md ">
      <div className="  flex justify-start items-start bg-primary rounded-md p-3 text-white w-full flex-col">
        <div className="flex  sm:flex-row flex-col gap-5 sm:gap-10 mb-5 sm:mb-0 ">
          <div className="flex gap-4 justify-start  items-start">
            <Avatar className="w-8 h-8">
              <AvatarImage src={image} alt="image" />
              <AvatarFallback>CC</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium text-sm">{name}</div>
              <div className="text-[0.75rem]">{email}</div>
            </div>
          </div>
          <div className="text-lg  ">
            {name} shared a build :
            <Link
              href={`/builds/${buildID}?view-only=true`}
              className=" border-b border-mono text-mono cursor-pointer pb-[0.125rem]"
            >
              {buildName}
            </Link>
          </div>
        </div>

        <div className="w-full  flex justify-end">
          <ReactionForm
            buttonName="reply"
            purpose="builds"
            sharedbuildID={sharedBuildID}
          ></ReactionForm>
        </div>
      </div>
      {children}
    </div>
  );
}
