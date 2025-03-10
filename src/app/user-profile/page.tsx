import { UserProfile } from "@clerk/nextjs";
export const metadata = {
  title: "profile",
};
export default function userProfile() {
  return (
    <>
      <UserProfile  />
    </>
  );
}
