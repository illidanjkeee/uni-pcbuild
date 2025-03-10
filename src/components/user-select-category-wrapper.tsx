"use client";
import SelectCategory from "./select-category";
import { useAdminStore } from "@/stores/admin-store";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "./ui/dropdown-menu";
export default function UserSelectCategoryWrapper() {
  const userSelectedCategory = useAdminStore(
    (state) => state.userSelectedCategory
  );
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className=" w-full sm:w-auto mt-8 sm:mt-0">
          <Button className=" flex sm:mt-3 sm:w-auto justify-center px-4 gap-3 items-center text-white ">
            {userSelectedCategory}
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <SelectCategory purpose="userFiltration"></SelectCategory>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
