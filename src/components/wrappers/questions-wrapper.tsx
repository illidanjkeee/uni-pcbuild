"use client";
import { useAdminStore } from "@/stores/admin-store";
export default function QuestionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const activeForumTab = useAdminStore((state) => state.activeForumTab);
  if (activeForumTab === "questions") {
    return <>{children}</>;
  } else {
    return null;
  }
}
