import Skeleton from "@/components/ui/skeleton/skeleton";
import React from "react";

export const DealSkeleton = ({ num }: { num?: number }) => {
  return (
    <div className="grid w-full grid-cols-3 gap-3">
      {[...Array(num ?? 9)].map((_, idx) => (
        <Skeleton key={idx} className="!h-52" />
      ))}
    </div>
  );
};
