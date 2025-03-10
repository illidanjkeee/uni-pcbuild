import { PopularBuildsCard } from "./popular-builds-card";
import SpecRange from "./spec-range";
import { Database } from "lucide-react";
import { Cpu } from "lucide-react";
import { Aperture } from "lucide-react";
import { MemoryStick } from "lucide-react";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import PopulateSpecialBuilds from "@/actions/populate-special-builds";
import SpecialBuilds from "@/schemas/server/special-builds-schema";
import connectdb from "@/lib/connectdb";
import { Button } from "./ui/button";
export default async function HomeSectionOne() {
  await PopulateSpecialBuilds();
  await connectdb();
  const specialBuilds = await SpecialBuilds.find({});

  return (
    <>
      <div className=" flex flex-col  py-24 w-full  justify-center items-center bg-slate-950 ">
        {/* <div className="text-6xl mb-16 font-semibold ">Popular Builds</div> */}
        <div className="flex flex-col gap-28 w-full justify-center items-center">
          <PopularBuildsCard
            description="evel up your gaming experience without breaking the bank!"
            imageLink="https://res.cloudinary.com/gamma1199/image/upload/v1712392689/good-build_vejzff.webp"
            name="RTX 4060"
            price={522.84}
            status="GOOD"
          >
            <SpecRange color="bg-red-500" range={70} title="Processor">
              <Cpu className="stroke-black"></Cpu>
            </SpecRange>
            <SpecRange color="bg-purple-500" range={30} title="Graphics">
              <Aperture className="stroke-black"></Aperture>
            </SpecRange>
            <SpecRange color="bg-orange-500" range={80} title="Memory">
              <MemoryStick className="stroke-black" />
            </SpecRange>
            <SpecRange color="bg-yellow-500" range={40} title="Storage">
              <Database className="stroke-black"></Database>
            </SpecRange>
            <div className="text-mono text-3xl   w-full mb-8 mt-2 flex justify-center sm:hidden">
              <span className="border-b-2 border-mono">522.84$</span>
            </div>
            <Link
              href={`/special-builds/${specialBuilds[0]._id.toString()}`}
              className="w-full flex"
            >
              <Button className="bg-blue-600 w-full mt-12 font-bold hover:opacity-80 transition-all hover:scale-95  gap-3 flex justify-center items-center  py-2">
                view build
                <MoveRight className="w-[30px] h-[30px] "></MoveRight>
              </Button>
            </Link>
          </PopularBuildsCard>

          <PopularBuildsCard
            description="evel up your gaming experience without breaking the bank!"
            imageLink="https://res.cloudinary.com/gamma1199/image/upload/v1712392705/better-build_ju98fg.webp"
            name="RTX 4070 SUPER

"
            price={509.98}
            status="BETTER"
          >
            <SpecRange color="bg-red-500" range={90} title="Processor">
              <Cpu className="stroke-black"></Cpu>
            </SpecRange>
            <SpecRange color="bg-purple-500" range={40} title="Graphics">
              <Aperture className="stroke-black"></Aperture>
            </SpecRange>
            <SpecRange color="bg-orange-500" range={50} title="Memory">
              <MemoryStick className="stroke-black" />
            </SpecRange>
            <SpecRange color="bg-yellow-500" range={70} title="Storage">
              <Database className="stroke-black"></Database>
            </SpecRange>
            <div className="text-mono text-3xl   w-full mb-8 mt-2 flex justify-center sm:hidden">
              <span className="border-b-2 border-mono">522.84$</span>
            </div>
            <Link
              href={`/special-builds/${specialBuilds[1]._id.toString()}`}
              className="w-full flex"
            >
              <Button className="bg-blue-600 mt-12 font-bold hover:opacity-80 transition-all hover:scale-95  gap-3 w-full flex justify-center items-center  py-2">
                view build
                <MoveRight className="w-[30px] h-[30px] "></MoveRight>
              </Button>
            </Link>
          </PopularBuildsCard>
          <PopularBuildsCard
            description="evel up your gaming experience without breaking the bank!"
            imageLink="https://res.cloudinary.com/gamma1199/image/upload/v1712392599/ultimate-build_szqkqd.webp"
            name="RTX 4080 SUPER"
            price={757.14}
            status="ULTIMATE"
          >
            <SpecRange color="bg-red-500" range={80} title="Processor">
              <Cpu className="stroke-black"></Cpu>
            </SpecRange>
            <SpecRange color="bg-purple-500" range={70} title="Graphics">
              <Aperture className="stroke-black"></Aperture>
            </SpecRange>
            <SpecRange color="bg-orange-500" range={90} title="Memory">
              <MemoryStick className="stroke-black" />
            </SpecRange>
            <SpecRange color="bg-yellow-500" range={95} title="Storage">
              <Database className="stroke-black"></Database>
            </SpecRange>

            <div className="text-mono text-3xl   w-full mb-8 mt-2 flex justify-center sm:hidden">
              <span className="border-b-2 border-mono">522.84$</span>
            </div>
            <Link
              href={`/special-builds/${specialBuilds[2]._id.toString()}`}
              className="w-full flex "
            >
              <Button className="bg-blue-600 mt-12 w-full font-bold hover:opacity-80 transition-all hover:scale-95  gap-3 flex justify-center items-center  py-2">
                view build
                <MoveRight className="w-[30px] h-[30px] "></MoveRight>
              </Button>
            </Link>
          </PopularBuildsCard>
        </div>
      </div>
    </>
  );
}
