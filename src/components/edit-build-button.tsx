"use client";
import { Dialog, DialogContent, DialogTrigger, DialogClose } from "./ui/dialog";
import { Button } from "./ui/button";
import { Edit } from "lucide-react";
import { EditBuildForm } from "./forms/edit-build-form";
export default function EditBuildButton() {
  return (
    <>
      <Dialog>
        <DialogTrigger
          className="w-full"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Button className="px-6 py-1 hover:opacity-80 hover:scale-95 transition-all">
            <Edit className="h-5 w-5  stroke-white" />
          </Button>
        </DialogTrigger>
        <DialogContent onCloseAutoFocus={(e) => e.stopPropagation()}>
          <EditBuildForm></EditBuildForm>
        </DialogContent>
      </Dialog>
    </>
  );
}
