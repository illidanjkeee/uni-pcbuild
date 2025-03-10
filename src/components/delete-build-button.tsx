"use client";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import deleteBuildAction from "@/actions/delete-build-action";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
export default function DeleteBuildButton({ buildId }: { buildId: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDelete = async () => {
    setIsDeleting(true);
    const res = await deleteBuildAction(buildId);
    if (!res) {
      setIsDeleting(false);
      return;
    }
    setIsDeleting(false);
  };
  return (
    <>
      <Button
        disabled={isDeleting}
        className=" px-6 py-1 text-white   rounded-md hover:opacity-80 hover:scale-95 transition-all"
        onClick={(e) => {
          handleDelete();
        }}
      >
        {isDeleting ? (
          <Loader2 className="h-5 w-5 animate-spin stroke-white" />
        ) : (
          <Trash2 className="h-5 w-5 stroke-white " />
        )}
      </Button>
    </>
  );
}
