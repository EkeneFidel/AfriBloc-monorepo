import { cn } from "@/lib/utils";
import { MarketPrice } from "../deals/deal-card";

interface PortfolioCardProps {
  title: string;
  className?: string;
  value: number;
}

export default function PortfolioCard({
  title,
  className,
  value,
}: PortfolioCardProps) {
  return (
    <div
      className={cn(
        "flex min-h-24 w-full flex-col gap-1 rounded-xl bg-white px-4 py-3.5 shadow-[0px_4px_20px_0px_#0000000D]",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <h3 className="text-Gray-700 text-sm font-normal">{title}</h3>
      </div>

      <div className="flex-1">
        <MarketPrice
          price={value}
          className="text-Gray-900 text-lg font-bold md:text-2xl"
        />
      </div>
    </div>
  );
}
