"use client";
import removeFromCartAction from "@/actions/remove-from-cart-action";
import { Button } from "./ui/button";
import { toast } from "@/components/ui/use-toast";
import { Delete, Loader2 } from "lucide-react";
import { useState } from "react";

export default function RemoveFromCart({
  buildID,
  look,
}: {
  buildID: string;
  look: "big" | "small";
}) {
  const [isRemoving, setIsRemoving] = useState(false);
  const handleRemoveFromCart = async () => {
    setIsRemoving(true);
    const res = await removeFromCartAction(buildID);
    if (!res) {
      toast({
        title: "cant remove build from cart",
      });
      setIsRemoving(false);
      return;
    }
    toast({
      title: "build removed from cart",
    });
    setIsRemoving(false);
  };
  if (look === "big") {
    return (
      <div
        onClick={handleRemoveFromCart}
        className="w-full border-2 cursor-pointer transition-all flex justify-center items-center sm:text-5xl font-semibold group hover:bg-destructive mt-4 text-2xl  py-8 px-2 text-center"
      >
        <span>Remove from Cart</span>
        <Delete className="sm:h-12 sm:w-12 sm:ml-4 ml-2 hidden  sm:flex" />
      </div>
    );
  }
  if (look === "small") {
    return (
      <Button
        disabled={isRemoving}
        onClick={handleRemoveFromCart}
        className="text-white hover:scale-95 hover:opacity-80 transition-all"
      >
        {isRemoving ? (
          <Loader2 className="h-6 w-6 animate-spin"></Loader2>
        ) : (
          "Remove"
        )}
      </Button>
    );
  }
}
