"use client";
import { toast } from "@/components/ui/use-toast";
import { EvervaultCard, Icon } from "@/components/ui/evervault-card";
import deleteBuildAction from "@/actions/delete-build-action";
import { useState } from "react";
import EditBuildButton from "./edit-build-button";
import Link from "next/link";
import DeleteBuildButton from "./delete-build-button";
import RemoveFromCart from "./remove-from-cart";
import Checkout from "./checkout-modal";
type BuiddCardPropsT = {
  name: string;
  buildId: string;
  allowRemoveFromCart?: boolean;
  allowGoToCheckout?: boolean;
  allowDeleteBuild?: boolean;
  allowEditBuild?: boolean;
};
export default function BuildCard({
  name,
  buildId,
  allowDeleteBuild,
  allowEditBuild,
  allowGoToCheckout,
  allowRemoveFromCart,
}: BuiddCardPropsT) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    const res = await deleteBuildAction(buildId);
    if (!res) {
      toast({
        title: "cant delete build  , try again",
      });
      setIsDeleting(false);

      return;
    }
    toast({
      title: "build deleted successfully",
    });
    setIsDeleting(false);
  };
  return (
    <>
      <div className="border border-white/[0.2] flex  flex-col items-start max-w-sm mx-auto p-4  relative h-auto">
        <Icon className="absolute h-6 w-6 -top-3 -left-3 text-white " />
        <Icon className="absolute h-6 w-6 -bottom-3 -left-3 text-white " />
        <Icon className="absolute h-6 w-6 -top-3 -right-3 text-white " />
        <Icon className="absolute h-6 w-6 -bottom-3 -right-3 text-white " />
        <Link href={`/builds/${buildId}`}>
          <EvervaultCard text={name} />
        </Link>

        <div className="flex gap-1 justify-center items-center w-full  mt-8">
          {allowDeleteBuild && (
            <DeleteBuildButton buildId={buildId}></DeleteBuildButton>
          )}
          {allowEditBuild && <EditBuildButton></EditBuildButton>}
          {allowGoToCheckout && <Checkout buildName={name} buildID={buildId} />}
          {allowRemoveFromCart && (
            <RemoveFromCart look="small" buildID={buildId} />
          )}
        </div>
      </div>
    </>
  );
}
