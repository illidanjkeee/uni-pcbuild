"use client";
import { useAdminStore } from "@/stores/admin-store";
import { Button } from "./ui/button";

export default function SwitchForumTabBtn() {
  const setActiveForumTab = useAdminStore((state) => state.setActiveForumTab);
  const activeForumTab = useAdminStore((state) => state.activeForumTab);
  return (
    <>
      <div className="flex sm:flex-row flex-col gap-4  justify-between ">
        <div className="text-3xl sm:text-4xl">
          {activeForumTab === "builds" ? "Shared Builds" : "Questions"}
        </div>
        <div className="flex gap-4">
          <Button
            className={` ${
              activeForumTab === "questions" ? "opacity-80 scale-90" : null
            } bg-secondary text-white  `}
            onClick={() => setActiveForumTab("questions")}
          >
            questions
          </Button>
          <Button
            className={` ${
              activeForumTab === "builds" ? "opacity-80 scale-90" : null
            } bg-secondary text-white `}
            onClick={() => setActiveForumTab("builds")}
          >
            builds
          </Button>
        </div>
      </div>
    </>
  );
}
