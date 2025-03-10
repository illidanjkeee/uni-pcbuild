import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { currentUser } from "@clerk/nextjs";
import { SignOutButton } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import Tracking from "../tracking";
import { RedirectToUserProfile } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { UserProfile } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default async function NavDD() {
  const user = await currentUser();

  console.log(user, "user");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-transparent text-white" asChild>
        <Button variant="default" className="gap-1 ">
          <Avatar className="w-[30px] h-[30px]">
            <AvatarImage
              width={5}
              height={5}
              src={user?.imageUrl}
              alt="user"
              className=" aspect-auto"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span>{user?.firstName}</span>
          <ChevronDown className="h-4 w-4"></ChevronDown>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <Link href={"/user-profile"}>
          <DropdownMenuItem className="cursor-pointer">
            manage account
          </DropdownMenuItem>
        </Link>
        {/* <DropdownMenuItem className="cursor-pointer">
          saved builds
        </DropdownMenuItem> */}
        <Link href="/cart">
          <DropdownMenuItem className="cursor-pointer">cart</DropdownMenuItem>
        </Link>
        <Dialog>
          <DialogTrigger className="w-full flex justify-start items-start">
            <Button className="bg-transparent pl-2 text-white hover:bg-secondary w-full flex justify-start items-start">
              tracking
            </Button>
          </DialogTrigger>
          <DialogContent>
            <Tracking />
          </DialogContent>
        </Dialog>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SignOutButton></SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
