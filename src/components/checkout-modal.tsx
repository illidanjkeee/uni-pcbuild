"use client";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import changeBuildStatus from "@/lib/change-build-status";
import { toast } from "@/components/ui/use-toast";
import { Button } from "./ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Span } from "next/dist/trace";
import placeOrderAction from "@/actions/place-order-action";
import { loadStripe } from "@stripe/stripe-js";
import giveAllPartsInAbuild from "@/lib/give-all-parts-in-a-build";
import total from "@/lib/total";
export default function Checkout({
  buildID,
  buildName,
}: {
  buildID: string;
  buildName?: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const handleCheckout = async () => {
    setIsLoading(true);
    const allParts = await giveAllPartsInAbuild(buildID);
    const bill = total(allParts);

    // if (!res) {
    //   toast({
    //     title: "cant place your order right now",
    //   });
    //   setIsLoading(false);
    //   return;
    // }
    // toast({
    //   title: "your order is placed",
    // });
    // setIsLoading(false);
    try {
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_TEST_STRIPE_PUBLISHABLE_KEY as string
      );
      if (!stripe) throw new Error("Stripe failed to initialize.");
      const checkoutResponse = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ buildID, buildName, bill }),
      });
      const { sessionId } = await checkoutResponse.json();
      if (!sessionId) {
        throw new Error("Failed to create checkout session.");
        setIsLoading(false);
      }
      console.log("))))))))))))))))))))))))))))))))0");
      const res = await changeBuildStatus(buildID, "checkout");
      const res2 = await placeOrderAction(buildID);
      setIsLoading(false);
      const stripeError = await stripe.redirectToCheckout({ sessionId });
      if (stripeError) {
        console.error(stripeError);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button
        className="text-white hover:opacity-80 hover:scale-95 transition-all "
        onClick={handleCheckout}
      >
        {isLoading ? (
          <Loader2 className="animate-spin h-6 w-6 stroke-white"></Loader2>
        ) : (
          <span>checkout</span>
        )}
      </Button>
      {/* <Button
        className="text-white hover:opacity-80 hover:scale-95 transition-all "
        onClick={handleCheckout}
      >
        {isLoading ? (
          <Loader2 className="animate-spin h-6 w-6 stroke-white"></Loader2>
        ) : (
          <span>place order</span>
        )}
      </Button> */}
    </>
  );
}

{
  /* <Dialog>
        <DialogTrigger>
          <Button
            className="text-white hover:opacity-80 hover:scale-95 transition-all "
            onClick={handleCheckout}
          >
            checkout
          </Button>
        </DialogTrigger>
        <DialogContent>
          <div className="text-white">
            DEVELOPER: I will move the user to stripe checkout page when I get
            the stripe account for now use place order button to simulate the
            checkout
          </div>
          <Button
            className="text-white hover:opacity-80 hover:scale-95 transition-all "
            onClick={handleCheckout}
          >
            {isLoading ? (
              <Loader2 className="animate-spin h-6 w-6 stroke-white"></Loader2>
            ) : (
              <span>place order</span>
            )}
          </Button>
        </DialogContent>
      </Dialog> */
}
