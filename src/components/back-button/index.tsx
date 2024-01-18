"use client";

import { useRouter, usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { ArrowLeftIcon } from "lucide-react";

export function BackButton() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    pathname !== "/" && (
      <Button
        onClick={() => router.back()}
        variant="ghost"
        className="mt-2 mx-10"
      >
        <ArrowLeftIcon /> Voltar
      </Button>
    )
  );
}
