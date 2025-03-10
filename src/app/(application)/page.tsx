import React from "react";
import { RedirectToUserProfile } from "@clerk/nextjs";
import { Hero } from "@/components/hero";
import Link from "next/link";
import { TypewriterEffect, TypewriterEffectSmooth } from "@/components/content";
import { MoveRight } from "lucide-react";
import HomeSectionOne from "@/components/home-section-one";
import HomeSectionTwo from "@/components/home-section-two";
import { Button } from "@/components/ui/moving-border";
export const metadata = {
  title: "Home",
};

const words = [
  {
    text: "Build",
    className: "text-white text-5xl lg:text-6xl",
  },
  {
    text: "Your",
    className: "text-white text-5xl lg:text-6xl",
  },
  {
    text: "Dream PC",
    className: "text-[#7ED348] text-5xl lg:text-6xl",
  },
  // {
  //   text: "Today",
  //   className: "text-white text-5xl lg:text-6xl hidden md:flex ",
  // },
];
export default async function Home() {
  return (
    <>
      <div className="w-full relative -z-1 flex flex-col justify-center items-center  ">
        <Hero images={["/bg-image-2.jpg"]} className="h-screen w-full">
          <div className="text-white z-20 flex flex-col items-center px-8">
            {/* <h1 className="font-bold text-4xl sm:text-5xl text-center md:hidden">
              Empower Your Experience
              <span className="text-primary">Build You7r PC </span> Today
            </h1> */}
            <TypewriterEffect words={words} cursorClassName="bg-[#7ED348] " />
            <p className="text-center font-semibold sm:text-lg md:text-2xl xl:w-2/3 mb-8 mt-4">
              Design, customize, and build PC: Your journey to crafting the
              perfect machine starts here.Unlock the potential of your
              imagination with BuildPC, the gateway to personalized computing
              excellence
            </p>
            <Link href="/builds">
              <Button
                borderRadius="0.8rem"
                className="   text-white  py-4 px-8 flex gap-2"
              >
                start building
                <MoveRight></MoveRight>
              </Button>
            </Link>
          </div>
        </Hero>
        <div className="max-w-[1440px] w-full flex justify-center items-center ">
          <HomeSectionOne />
        </div>
        <div className="max-w-[1440px] w-full flex justify-center items-center ">
          <HomeSectionTwo />
        </div>
      </div>
    </>
  );
}
