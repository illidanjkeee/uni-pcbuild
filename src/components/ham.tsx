"use client";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { X } from "lucide-react";
import { useState } from "react";
import NavDD from "./dropdowns/nav-dd";
import Image from "next/image";
import Link from "next/link";
import { hamLinks } from "@/data/ham-links";
import HamDDWrapper from "./wrappers/ham-dd-wrapper";
export default function Ham({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [open, setOpen] = useState(false);

  let body = document.body;
  console.log(body);
  const handleClosingHam = () => {
    setOpen(!open);
    document.body.style.overflowY = "visible";
  };
  const handleOpeningHam = () => {
    setOpen(!open);
    document.body.style.overflowY = "hidden";
  };
  return (
    <>
      <div
        className={cn(" w-full   flex-col absolute z-50", className)}
        {...props}
      >
        <div className=" backdrop-blur-[126px] border-b bg-opacity-20 border-b-slate-700  h-[8vh] w-full  flex items-center pr-3  justify-between ">
          {children}

          {!open ? (
            <Menu
              className="h-8 w-8 text-white cursor-pointer"
              onClick={handleOpeningHam}
            />
          ) : (
            <X
              className="h-8 w-8 text-white cursor-pointer"
              onClick={handleClosingHam}
            />
          )}
        </div>
        {open && (
          <div className="h-[92vh] gap-6 w-full bg-slate-950 flex-col p-6 flex overflow-hidden">
            {hamLinks.map((hamLink: any) => {
              return (
                <a
                  href={hamLink.link}
                  key={hamLink.id}
                  className="text-4xl text-mono font-semibold cursor-pointer"
                >
                  {hamLink.title}
                </a>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
