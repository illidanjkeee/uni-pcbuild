"use client";
import { useAdminStore } from "@/stores/admin-store";
export default function ShareBuildsWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const activeForumTab = useAdminStore((state) => state.activeForumTab);
  if (activeForumTab === "builds") {
    return <>{children}</>;
  } else {
    return null;
  }
}
