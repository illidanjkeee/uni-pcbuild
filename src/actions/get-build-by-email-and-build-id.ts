import User from "@/schemas/server/user-server-schema";
import connectdb from "@/lib/connectdb";

export default async function getBuildByEmailAndId(
  userEmail: string,
  buildId: string
) {
  let user = await User.findOne({ userEmail: userEmail });

  if (!user) {
    return false;
  }

  let build = user.builds.find(
    (build: any) => build._id.toString() === buildId
  );

  if (!build) {
    return false;
  }

  return {
    userEmail: userEmail,
    build: build,
  };
}
