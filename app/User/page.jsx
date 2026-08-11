"use client";
import { useRouter } from "next/navigation";
import UserPanel from "@/components/layout/userPanel";

export default function User() {
  const router = useRouter();

  return <UserPanel isOpen onClose={() => router.back()} />;
}
