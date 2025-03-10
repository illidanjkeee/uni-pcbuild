import giveAllPartsInAbuild from "@/lib/give-all-parts-in-a-build";
import PutInCart from "@/components/put-in-cart";
import { nanoid } from "nanoid";
import RemoveFromCart from "@/components/remove-from-cart";
import connectdb from "@/lib/connectdb";
import User from "@/schemas/server/user-server-schema";
import { currentUser } from "@clerk/nextjs";
import BrowseCard from "@/components/browse-card";
import { Button } from "@/components/ui/button";
import total from "@/lib/total";
import GradientText from "@/components/gradient-text";
import { ObjectId } from "mongodb";
import { Delete, Edit, ShoppingCart } from "lucide-react";
import EditBuildButton from "@/components/edit-build-button";
import DeleteBuildButton from "@/components/delete-build-button";
import Link from "next/link";
export default async function SingleBuild({
  params,
  searchParams,
}: {
  params: any;
  searchParams: any;
}) {
  const viewOnly = searchParams["view-only"] === "true";
  await connectdb();
  const user = await currentUser();
  const build = await User.aggregate([
    {
      $match: {
        userEmail: user?.emailAddresses[0].emailAddress,
      },
    },
    {
      $unwind: "$builds", // Unwind the builds array
    },
    {
      $match: {
        "builds._id": new ObjectId(params.buildID),
      },
    },
    {
      $project: {
        build: "$builds", // Project the matched build
        _id: 0, // Exclude the _id field
      },
    },
  ]);
  const parts = await giveAllPartsInAbuild(params.buildID);

  const buildAction = () => {
    if (parts.length > 0) {
      if (!build[0]?.build.inCart) {
        return <PutInCart buildID={params.buildID} />;
      }
      if (build[0]?.build.inCart) {
        return <RemoveFromCart look="big" buildID={params.buildID} />;
      }
    } else {
      return (
        <div className="w-full border-2  transition-all flex justify-center items-center text-5xl font-semibold group bg-secondary mt-4  py-8">
          <span>No components Added</span>
          {/* <ShoppingCart className="h-12 w-12 ml-4 group-hover:animate-bounce" /> */}
        </div>
      );
    }
  };

  return (
    <>
      <div className="pt-24 w-full max-w-[1440px] px-8 flex flex-col ">
        <div className="flex flex-col sm:flex-row  justify-between w-full ">
          <div className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text  text-5xl font-bold ">
            {build[0]?.build.name}
          </div>
          <div className="flex justify-center items-center gap-4">
            {/* <EditBuildButton />
            <DeleteBuildButton buildId={params.buildID} /> */}
            {!viewOnly ? (
              <Link
                href={"/browse"}
                className=" w-full sm:mt-0 mt-3 mb-10 sm:mb-0"
              >
                <Button className="text-white hover:opacity-80 hover:scale-95 transition-all">
                  Add Components
                </Button>
              </Link>
            ) : null}
          </div>
        </div>

        <div className="flex flex-wrap gap-4 w-full sm:mt-8 ">
          {parts
            ? parts?.map((part: any) => {
                return (
                  <BrowseCard
                    category={part.partType}
                    name={part.name}
                    partId={part._id.toString()}
                    key={nanoid()}
                    price={part.price}
                    image={part.image}
                    allowAddToBuild={false}
                    allowRemoveFromBuild={!viewOnly}
                    buildId={params.buildID}
                  ></BrowseCard>
                );
              })
            : null}
        </div>

        <div className="flex justify-between w-full text-[2.15rem] sm:text-6xl font-bold my-16">
          <div>Total : </div>
          <div className="sm:border-b-2 pb-2 sm:border-b-mono text-mono">
            {total(parts)}$
          </div>
        </div>

        {!viewOnly ? buildAction() : null}
      </div>
    </>
  );
}
