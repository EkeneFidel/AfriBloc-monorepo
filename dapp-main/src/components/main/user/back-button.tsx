"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const { back } = useRouter();

  const handleBack = () => {
    back();
  };

  return (
    <button onClick={handleBack} className="flex items-center gap-2.5">
      <ArrowLeft className="text-Gray-900 size-5" />
      <span className="text-Gray-900 text-sm">Back</span>
    </button>
  );
}
