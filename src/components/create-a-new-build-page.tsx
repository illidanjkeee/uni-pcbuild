"use client";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import BuidForm from "./forms/build-form";
import { Button } from "./ui/moving-border";
import { Plus } from "lucide-react";
import { useAdminStore } from "@/stores/admin-store";
export default function CreateANewBuildPage() {
  const userSelectedItem = useAdminStore((state) => state.userSelectedCategory);

  return (
    <>
      <div>
        <Dialog>
          <DialogTrigger className="sm:mt-2">
            <Button
              borderRadius="0.8rem"
              className="   text-black text-bold  py-3 px-6 flex gap-2 border-none"
            >
              new build
              <Plus />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <BuidForm></BuidForm>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
