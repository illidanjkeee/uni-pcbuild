"use client";
import Link from "next/link";
import Image from "next/image";
import { BarChartBig } from "lucide-react";
import { usePathname } from "next/navigation";
import { PlusCircle } from "lucide-react";
import { Computer } from "lucide-react";
import { ChevronLeft } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const isActive = (path: string) => path === pathname;
  return (
    <>
      <div className="lg:w-[20vw] border-r h-screen max-h-screen ">
        <div className="h-[13%] text-black text-2xl flex   font-bold   items-center border-b-2 ">
          <Image
            src={"/half-logo.png"}
            alt="custom pc builder"
            width={50}
            height={50}
            className="flex lg:hidden ml-2"
          />
          <Image
            src={"/logo.png"}
            alt="custom pc builder"
            width={130}
            height={130}
            className="hidden lg:flex ml-6"
          />
        </div>
        <div className="flex flex-col justify-between h-[87%]">
          <div className="flex flex-col gap-4 text-xl pl-2 pt-8  items-start font-semibold text-white pr-3">
            <Link
              className={`hover:bg-[#7ED348] ${
                isActive("/dashboard") ? "bg-mono text-black" : null
              } transition-all ease-linear justify-center lg:justify-end items-center hover:text-black w-auto lg:w-full rounded-lg py-2 lg:pl-6 px-3 lg:pr-0  flex flex-row-reverse gap-4 `}
              href="/dashboard"
            >
              <span className="lg:flex hidden">dashboard</span>
              <BarChartBig></BarChartBig>
            </Link>

            <Link
              className={`hover:bg-[#7ED348] ${
                isActive("/dashboard/add-parts") ? "bg-mono text-black" : null
              } transition-all ease-linear justify-end items-center hover:text-black w-auto lg:w-full rounded-lg py-2 lg:pl-6 px-3 lg:pr-0  flex flex-row-reverse gap-4 `}
              href="/dashboard/add-parts"
            >
              <span className="lg:flex hidden">add parts</span>
              <PlusCircle></PlusCircle>
            </Link>
            <Link
              className={`hover:bg-[#7ED348] ${
                isActive("/dashboard/parts") ? "bg-mono text-black" : null
              } transition-all ease-linear justify-end items-center hover:text-black w-auto lg:w-full rounded-lg py-2 lg:pl-6 px-3 lg:pr-0  flex flex-row-reverse gap-4 `}
              href="/dashboard/parts"
            >
              <span className="lg:flex hidden">all parts</span>
              <Computer></Computer>
            </Link>
          </div>
          <Link
            className={`hover:bg-[#7ED348] my-8 w-auto lg:w-[90%] mx-2 font-bold   transition-all ease-linear justify-end items-center hover:text-black  rounded-lg py-2 lg:pl-6 px-3 lg:pr-0  flex flex-row-reverse gap-4 `}
            href="/dashboard"
          >
            <span className="lg:flex hidden">back to website</span>
            <ChevronLeft></ChevronLeft>
          </Link>
        </div>
      </div>
    </>
  );
}
