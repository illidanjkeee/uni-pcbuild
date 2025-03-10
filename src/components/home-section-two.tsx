"use client ";
import Image from "next/image";
import GradientText from "./gradient-text";
import { PersonStanding } from "lucide-react";
import { Button } from "./ui/moving-border";
import Link from "next/link";
export default function HomeSectionTwo() {
  return (
    <>
      <div className="flex w-[90%]  h-auto xl:justify-between items-center xl:mt-20 mt-6  justify-center">
        <div className="flex flex-col  w-full xl:text-left text-center  xl:w-[50%] gap-8 justify-center max-w-[766px]  ">
          <div className=" xl:hidden leading-[2.75rem] flex flex-col  gap-4  text-3xl tsm:text-4xl sm:text-5xl  font-bold  ">
            Ask Questions Or Share Builds on our Forum
          </div>

          <div className=" xl:flex hidden   flex-col  gap-4  text-3xl tsm:text-4xl sm:text-5xl  font-bold  ">
            <span>Ask Questions Or Share</span>
            <span> Builds on our Forum</span>
          </div>

          <Link
            href="/forum"
            className="w-full flex justify-center xl:justify-start"
          >
            <button className="w-[50%] bg-mono rounded-md flex justify-center items-center font-semibold py-2 text-lg gap-2 hover:opacity-90 hover:scale-95 transition-all  ">
              Go to Forum
              <PersonStanding className="w-8 h-8 hidden" />
            </button>
          </Link>
        </div>
        <Image
          src="https://res.cloudinary.com/gamma1199/image/upload/v1712402205/forum_ysedaq.webp"
          alt="bg-image-2"
          width="500"
          height="500"
          className="xl:flex hidden rounded-md shadow-xl"
        />
      </div>
    </>
  );
}
{
  /*`use client`;
import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";
import GradientText from "./gradient-text";
import { Button } from "./ui/moving-border";
import { Share2 } from "lucide-react";

export default function HomeSectionTwo() {
  return (
    <LampContainer className="w-full h-[50%]">
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className=" flex flex-col w-full  "
      >
        <div className="flex  w-full flex-col gap-4 mb-16 justify-center items-center ">
          <GradientText size="text-6xl">
            Ask Questions or Share Builds
          </GradientText>
          <GradientText size="text-6xl">On Our Forum</GradientText>
        </div>
        <div className="w-full flex justify-center ">
          <Button
            borderRadius="0.8rem"
            className=" w-full  text-white text-bold  py-3 px-6 flex gap-2 border-none"
          >
            Go to Forum
            <Share2 />
          </Button>
        </div>
      </motion.h1>
    </LampContainer>
  );
}*/
}
