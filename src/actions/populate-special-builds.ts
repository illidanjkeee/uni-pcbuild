import connectdb from "@/lib/connectdb";
import SpecialBuilds from "@/schemas/server/special-builds-schema";

export default async function PopulateSpecialBuilds() {
  try {
    await connectdb();
    const collectionExists = await SpecialBuilds.exists({});
    if (!collectionExists) {
      const builds = [
        {
          buildName: "RTX 4060 ",
          parts: [
            {
              partId: "660e6b2e7cbf23dddd10af88",
              partType: "case",
            },
            {
              partId: "660f27b27d66624897e616a5",
              partType: "Cpu",
            },
            {
              partId: "660f27797d66624897e5d426",
              partType: "motherboard",
            },
          ],
        },
        {
          buildName: "RTX 4070 SUPER",
          parts: [
            {
              partId: "660e6b2e7cbf23dddd10af4c",
              partType: "case",
            },
            {
              partId: "660f27b27d66624897e61573",
              partType: "Cpu",
            },
            {
              partId: "660f27797d66624897e5d3c5",
              partType: "motherboard",
            },
          ],
        },
        {
          buildName: "RTX 4080 SUPER",
          parts: [
            {
              partId: "660e6b2e7cbf23dddd10b075",
              partType: "case",
            },
            {
              partId: "660f27b27d66624897e614e3",
              partType: "Cpu",
            },
            {
              partId: "660f27797d66624897e5d477",
              partType: "motherboard",
            },
          ],
        },
      ];

      await SpecialBuilds.insertMany(builds);
    }
    return;
  } catch (error) {
    console.error(error, "error populating special builds");
  }
}
