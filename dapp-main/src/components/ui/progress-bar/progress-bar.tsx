import React from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  percentage: number;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage, className }) => {
  return (
    <div className={cn("bg-BlueGray-100 h-2 w-full rounded-full", className)}>
      <div
        className="bg-Orange-500 h-full rounded-full"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default ProgressBar;
