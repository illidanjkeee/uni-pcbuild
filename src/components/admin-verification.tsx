"use client";
import { useAdminStore } from "@/stores/admin-store";
import { useRouter } from "next/navigation";

export function AdminVerification() {
  const router = useRouter();

  const setAdminPassword = useAdminStore((state) => state.setAdminPassword);
  const adminPassword = useAdminStore((state) => state.adminPassword);

  if (adminPassword === "none") {
    router.push("/security");
    return null;
  }
  return;
}
