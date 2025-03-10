import showAllBuildsOfAUser from "@/lib/showAllBuildsOfAUser";
import { buildT } from "@/types/build-type";
import { nanoid } from "nanoid";
import Link from "next/link";
import BuildCard from "@/components/build-card";
import GradientTextL from "@/components/gradient-text";
import CreateANewBuildPage from "@/components/create-a-new-build-page";
export const metadata = {
  title: "builds",
};
export default async function Build() {
  const allBuilds = await showAllBuildsOfAUser();
  return (
    <>
      <div className="pt-14 md:pt-20 w-full max-w-[1440px] px-8 mt-8">
        <div className="w-full md:flex-row flex-col items-center  flex md:justify-between     ">
          <GradientTextL className="mb-14 md:mb-0 text-5xl md:text-6xl">
            Builds
          </GradientTextL>

          <CreateANewBuildPage />
        </div>
        <div className="flex justify-start">
          <div className="flex flex-wrap items-center justify-center  gap-16 mt-8 md:mt-20 mb-4">
            {allBuilds?.map((build: buildT) => {
              return (
                <BuildCard
                  buildId={build._id.toString()}
                  name={build.name}
                  key={nanoid()}
                  allowDeleteBuild={true}
                  allowEditBuild={true}
                />
              );
            })}
          </div>
        </div>
        <div>
          {/* TODO: put a map to the build cards */}
          {/* <BuildCard></BuildCard> */}
        </div>
      </div>
    </>
  );
}
