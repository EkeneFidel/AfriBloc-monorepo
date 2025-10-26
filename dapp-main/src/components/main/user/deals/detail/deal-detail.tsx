"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import DetailSection from "./detail-section";
import CostBreakdownSection from "./cost-breakdown-section";
import DocumentSection from "./document-section";
import { PropertyTypes } from "@/types/property";

const dealsTabs = [
  { tab: "detail", text: "Property details" },
  { tab: "cost-breakdown", text: "Cost Breakdown" },
  { tab: "document", text: "Documents" },
];

const DealTabs = ({ selectedTab }: { selectedTab: string }) => {
  return (
    <div className="border-BlueGray-200 flex w-[270px] items-center justify-start overflow-x-auto border-b whitespace-nowrap lg:w-full">
      {dealsTabs.map((category, idx) => (
        <Link
          href={`#${category.tab}`}
          key={idx}
          className={cn(
            "flex h-10 flex-shrink-0 items-center justify-center gap-x-2 px-2 text-sm transition-colors duration-300 md:px-8",
            selectedTab === category.tab
              ? "border-Purple-500 text-Primary-500 border-b-2 font-medium"
              : "text-Gray-600 font-normal",
          )}
        >
          {category.text}
        </Link>
      ))}
    </div>
  );
};

export default function DealDetail({ property }: { property: PropertyTypes }) {
  const selectedTab = "detail";

  return (
    <div className="col-start w-full gap-6">
      <DealTabs selectedTab={selectedTab} />
      <DetailSection property={property} />
      <CostBreakdownSection property={property} />
      <DocumentSection property={property} />
    </div>
  );
}
