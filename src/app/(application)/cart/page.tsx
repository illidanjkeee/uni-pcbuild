import giveInCartBuilds from "@/lib/give-in-cart-builds";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Checkout from "@/components/checkout-modal";
import checkoutModal from "@/components/checkout-modal";
import { nanoid } from "nanoid";
import RemoveFromCart from "@/components/remove-from-cart";
import BuildCard from "@/components/build-card";
import { IconTemperatureSnow } from "@tabler/icons-react";
import GradientText from "@/components/gradient-text";
export const metadata = {
  title: "cart",
};
export default async function Cart() {
  const inCartBuilds = await giveInCartBuilds();

  return (
    <>
      <div className="mt-32  max-w-[1440px] px-8 flex flex-col w-full justify-start items-start">
        <GradientText className="text-6xl mb-14">Cart</GradientText>
        <div>
          <div className="flex justify-start items-start  w-full">
            <div className="flex justify-start items-start  flex-wrap w-full gap-12 ">
              {inCartBuilds
                ? inCartBuilds.map((item) => {
                    return (
                      <BuildCard
                        buildId={item.builds._id.toString()}
                        name={item.builds.name}
                        key={nanoid()}
                        allowGoToCheckout={true}
                        allowRemoveFromCart={true}
                      />
                    );
                  })
                : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

//  <div
//                     key={nanoid()}
//                     className="border p-8 bg-green-600 flex gap-4"
//                   >
//                     <div>{item.builds.name}</div>
//                     <Link href="/browse">
//                       <Button>browse more</Button>
//                     </Link>
//                     <Checkout buildID={item.builds._id.toString()} />
//                     <RemoveFromCart
//                       buildID={item.builds._id.toString()}
//                     ></RemoveFromCart>
//                   </div>
