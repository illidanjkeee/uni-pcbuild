"use client";
import { buildT } from "@/types/build-type";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import addBuildAction from "./add-build";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import { Share2 } from "lucide-react";
export default function BuildInput({ userInfo }: { userInfo: any }) {
  console.log(userInfo, "userInfo");
  const userBuilds = userInfo[0]?.builds;
  console.log(userBuilds, "userBuilds");
  const handleShareBuild = async (id: string, name: string, parts: any) => {
    const res = await addBuildAction(id, name, parts);
    if (!res) {
      toast({ title: "Error while sharing build" });
      return;
    }
    toast({ title: "Build shared" });
  };
  return (
    <>
      <Dialog>
        <DialogTrigger className=" flex justify-start sm:items-end mt-4 sm:mt-0">
          <Button className=" flex gap-3 text-white">
            share build
            <Share2 />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <div className="flex  flex-wrap font-bold gap-3">
            {userBuilds?.map((builds: buildT) => {
              return (
                <div
                  onClick={() =>
                    handleShareBuild(builds._id, builds.name, builds.parts)
                  }
                  key={builds._id}
                  className="bg-mono cursor-pointer text-black px-2 py-2 rounded-md hover:opacity-80 hover:scale-95 transition-all"
                >
                  <div>{builds.name}</div>
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
