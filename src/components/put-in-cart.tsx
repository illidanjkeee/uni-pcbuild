"use client";
import { Button } from "./ui/button";
import { toast } from "@/components/ui/use-toast";
import putInCartAction from "@/actions/put-in-cart-action";
import { ShoppingCart } from "lucide-react";
import { publicDecrypt } from "crypto";
export default function PutInCart({ buildID }: { buildID: string }) {
  const putInCartHandler = async () => {
    const res = await putInCartAction(buildID);
    if (!res) {
      toast({
        title: "cant put in cart  , try again",
      });
      return;
    }
    toast({
      title: "build put in cart successfully",
    });
  };
  return (
    <>
      <div
        onClick={putInCartHandler}
        className="w-full border-2 cursor-pointer transition-all flex justify-center items-center sm:text-5xl font-semibold group hover:bg-primary mt-4  py-8 text-2xl"
      >
        <span>Add to Cart</span>
        <ShoppingCart className="sm:h-12 sm:w-12 sm:ml-4 ml-2 group-hover:animate-bounce" />
      </div>

      {/* <div>
        <Button onClick={putInCartHandler}>put in cart</Button>
      </div> */}
    </>
  );
}
