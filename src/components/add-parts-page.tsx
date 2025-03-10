"use client";
import SelectCategory from "./select-category";
import { useAdminStore } from "@/stores/admin-store";
import giveAdminAddPartForm from "@/lib/giveAdminAddPartForm";
// import { Button } from "./ui/button";
import { Button } from "./ui/moving-border";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "./ui/dropdown-menu";
export default function AddPartsPage() {
  const adminSelectedCategory = useAdminStore(
    (state: any) => state.adminSelectedCategory
  );
  return (
    <>
      <div className="flex justify-between items-center flex-col w-full">
        <div className="flex sm:flex-row flex-col justify-between sm:items-center items-start gap-3 sm:gap-0 w-full">
          <div className="text-4xl bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text font-semibold">
            add parts
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button
                className="flex px-6 py-3 gap-2  justify-center items-center text-black font-bold"
                borderRadius="0.5rem "
              >
                {adminSelectedCategory === "none"
                  ? "add a part"
                  : adminSelectedCategory}
                <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <SelectCategory purpose="generateForm"></SelectCategory>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className=" w-full">
          {giveAdminAddPartForm(adminSelectedCategory)}
        </div>
      </div>
    </>
  );
}
