"use client";
import React from "react";
import { BackgroundGradient } from "./ui/background-gradient";
import { IconAppWindow } from "@tabler/icons-react";
import Image from "next/image";
import GradientText from "./gradient-text";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { UrlObject } from "url";

type PopularBuildsCardPropsT = {
  status: string;
  name: string;
  description: string;
  price: number;
  buildLink?: string;

  imageLink: string;
  children: React.ReactNode;
};

export function PopularBuildsCard({
  status,
  name,
  description,
  price,
  buildLink,
  imageLink,
  children,
}: PopularBuildsCardPropsT) {
  return (
    <div className="flex flex-col w-[80%]  ">
      <BackgroundGradient className="  rounded-[22px]  p-4 sm:p-10 bg-zinc-900 flex gap-48 items-center ">
        <Image
          src={imageLink}
          alt="specialBuilds"
          height="30"
          width="400"
          className="object-contain rounded-lg xl:flex hidden"
        />
        <div className="flex flex-col w-full justify-center items-center  md:items-start  ">
          <div className="flex xl:items-center items-end justify-center flex-wrap-reverse sm:justify-between xl:justify-end 2xl:justify-between  mb-8 flex-row-reverse xl:gap-12   w-full ">
            <div className="  border-mono border-b-2 text-mono text-3xl font-medium hidden sm:flex">
              {price}$
            </div>
            <p className="md:text-6xl font-bold italic tsm:text-5xl text-4xl ">
              {status}
            </p>
          </div>
          <GradientText className="text-3xl text-center md:text-left">
            {name}
          </GradientText>

          <div className="w-[80%] flex flex-col gap-4 mt-4 max-w-[460px]">
            {children}
          </div>

          {/* <a href={buildLink}>
            <button className="bg-blue-600 font-bold hover:opacity-80 transition-all hover:scale-105  gap-3 flex justify-center items-center mt-12 py-2">
              view build
              <MoveRight className="w-[30px] h-[30px] "></MoveRight>
            </button>
          </a> */}
        </div>
      </BackgroundGradient>
    </div>
  );
}
