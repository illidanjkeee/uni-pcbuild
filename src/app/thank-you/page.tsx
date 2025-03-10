import GradientTextL from "@/components/gradient-text";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Thankyou() {
  return (
    <>
      <div className="h-[82vh] flex flex-col justify-center items-center  overflow-y-auto pb-4 mt-8">
        <GradientTextL className="sm:text-4xl sm:text-left text-center text-3xl font-semibold">
          Thank you for your purchase!
        </GradientTextL>
        <Link href="/" className="mt-6">
          <Button
            variant="secondary"
            className="justify-center items-center flex gap-3"
          >
            <ChevronLeft className="h-4 w-4"></ChevronLeft>
            back
          </Button>
        </Link>
      </div>
    </>
  );
}
