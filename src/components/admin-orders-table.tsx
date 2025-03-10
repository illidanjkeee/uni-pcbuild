"use client";
import giveCheckoutBuilds from "@/lib/give-checkout-builds";
import { buildT } from "@/types/build-type";
import { nanoid } from "nanoid";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import changeBuildStatus from "@/lib/change-build-status";
import { toast } from "./ui/use-toast";
type AdminOrdersTablePropsT = {
  allBuilds: {
    userEmail: string;
    builds: buildT;
  }[];
};

export default function AdminOrdersTable({
  allBuilds,
}: AdminOrdersTablePropsT) {
  console.log("admin order table ....", allBuilds);
  const handleDisapprove = async (buildID: string, newStatus: string) => {
    const res = await changeBuildStatus(buildID, newStatus);
    if (!res) {
      toast({
        title: "status cant be changed",
      });
    }

    toast({
      title: `status changed to ${newStatus}`,
    });
  };
  const handleShipped = async (buildID: string, newStatus: string) => {
    const res = await changeBuildStatus(buildID, newStatus);
    if (!res) {
      toast({
        title: "status cant be changed",
      });
    }

    toast({
      title: `status changed to ${newStatus}`,
    });
  };
  return (
    <>
      <div>
        <div>ORDERS</div>
        <div>
          <div>user</div>
          <div>build name</div>
          <div>amount</div>
          <div>status</div>
        </div>
        <div>
          {allBuilds?.map((item) => {
            return (
              <div key={nanoid()}>
                <div>{item.userEmail}</div>
                <div>{item.builds.name}</div>
                <div>{item.builds.status}</div>
                <div>1000$</div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="text-black">
                      change status
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuItem
                      onSelect={() =>
                        handleShipped(item.builds._id.toString(), "shipped")
                      }
                    >
                      shipped
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() =>
                        handleDisapprove(
                          item.builds._id.toString(),
                          "disapprove"
                        )
                      }
                    >
                      disapprove
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
