"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import adminChangeStatus from "@/actions/admin-change-status";
export default function AdminChangeStatusDD({ buildID }: { buildID: string }) {
  const handleApprovedState = async () => {
    await adminChangeStatus("approved", buildID);
  };
  const handleRejectedState = async () => {
    const res = await adminChangeStatus("rejected", buildID);
    console.log(res, "res from rejected");
  };
  const handleShippedState = async () => {
    await adminChangeStatus("shipped", buildID);
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button className="flex justify-center px-4 gap-3 items-center text-white">
            change status
            <ChevronDown />
          </Button>
      </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={handleApprovedState}>
            approved
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={handleRejectedState}>
            rejected
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={handleShippedState}>
            shipped
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
