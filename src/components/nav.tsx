import Link from "next/link";
import NavDD from "./dropdowns/nav-dd";
import { SignInButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { cn } from "@/lib/utils";
export default async function Nav({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const user = await currentUser();
  const linkClasses = "hover:text-mono transition-colors";
  return (
    <>
      <div
        className={cn(
          "flex fixed z-20 w-full    justify-around items-center   py-4 backdrop-blur-[126px] border-b bg-opacity-20 border-b-slate-700  ",
          className
        )}
        {...props}
      >
        <Link href="/">
          <Image
            src="/logo.png"
            alt="logo"
            width={130}
            height={130}
            className="cursor-pointer"
          ></Image>
        </Link>
        <div className="flex gap-16">
          <Link href="/" className={`${linkClasses}`}>
            home
          </Link>
          <Link href="/forum" className={`${linkClasses}`}>
            forum
          </Link>
          <Link href="/builds" className={`${linkClasses}`}>
            builds
          </Link>
          <Link href="/browse" className={`${linkClasses}`}>
            {" "}
            browse
          </Link>
        </div>
        <div>
          {user ? <NavDD></NavDD> : <SignInButton>login/signup</SignInButton>}
        </div>
      </div>
    </>
  );
}
