"use client";
import React from "react";
import { BackgroundBeams } from "./ui/background-beams";
import Image from "next/image";
import Link from "next/link";
export function Footer() {
  return (
    <div className="h-[40rem] mt-36 w-full rounded-md bg-slate-950 relative flex flex-col items-center justify-center antialiased">
      <footer className="w-full ">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-start lg:gap-8">
            <div className="mt-8 grid grid-cols-2 gap-8 lg:mt-0 lg:grid-cols-5 lg:gap-y-16">
              <div className="col-span-2">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Build your dream PC with us!
                  </h2>

                  <p className="mt-4 text-gray-400">
                    {`"Confused about what parts to buy? No worries, we've got you
                    covered! Don't hesitate to visit our forum and ask our
                    amazing community."`}
                  </p>
                </div>
              </div>
              <div className="col-span-2 lg:col-span-3 lg:flex lg:items-end justify-end">
                <Image
                  alt="custom-computers"
                  src="/logo.png"
                  width={230}
                  height={230}
                  className=""
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="relative font-medium text-mono">Quick Links</p>

                <ul
                  style={{ listStyle: "none" }}
                  className="mt-6 space-y-4 text-sm"
                >
                  <li>
                    <Link
                      href="/"
                      className="transition hover:opacity-75 text-gray-200"
                    >
                      Home
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/browse"
                      className="transition hover:opacity-75 text-gray-200"
                    >
                      browse
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/builds"
                      className="transition hover:opacity-75 text-gray-200 cursor-pointer"
                    >
                      builds
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/forum"
                      className="transition hover:opacity-75 text-gray-200"
                    >
                      forum
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <ul
                  style={{ listStyle: "none" }}
                  className="mt-6 space-y-4 text-sm"
                >
                  <li>
                    <Link
                      href="/cart"
                      className="transition hover:opacity-75 text-gray-200"
                    >
                      cart
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/user-profile"
                      className="transition hover:opacity-75 text-gray-200"
                    >
                      user profile
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t pt-8 border-gray-800">
            <div className="sm:flex sm:justify-between">
              <p className="text-xs text-gray-400">
                © 2024. custom PC builder. All rights reserved.
              </p>

              <ul
                style={{ listStyle: "none" }}
                className="mt-8 flex flex-wrap justify-start gap-4 text-xs sm:mt-0 lg:justify-end"
              >
                <li>
                  <a
                    href="https://www.codewithfaraz.com/terms-and-conditions"
                    className="transition hover:opacity-75 text-gray-400"
                  >
                    Terms & Conditions
                  </a>
                </li>

                <li>
                  <a
                    href="https://www.codewithfaraz.com/privacy-policy"
                    className="transition hover:opacity-75 text-gray-400"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      <BackgroundBeams className="relative -z-1" />
    </div>
  );
}
