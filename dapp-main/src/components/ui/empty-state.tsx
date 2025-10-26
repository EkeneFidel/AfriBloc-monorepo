import { cn } from "@/lib/utils";
import Image from "next/image";
import EmptyStateImage from "/public/svgs/empty-state.svg";

type EmptyStateProps = {
  title: string;
  description: string;
  className?: string;
  renderContent?: React.ReactNode;
  showImage?: boolean;
};

export default function EmptyState({
  title,
  description,
  className,
  renderContent,
  showImage = true,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex h-full flex-col items-center justify-center gap-3 bg-white p-1",
        className,
      )}
    >
      {showImage && <Image src={EmptyStateImage} alt="empty-state" />}

      <div className="space-y-1.5 text-center">
        <h4 className="text-Gray-900 text-lg font-bold md:text-2xl">
          {title}
        </h4>
        <p className="text-Gray-700 max-w-[286px] text-xs leading-[1.35] font-normal md:text-sm">
          {description}
        </p>
        {renderContent}
      </div>
    </div>
  );
}
