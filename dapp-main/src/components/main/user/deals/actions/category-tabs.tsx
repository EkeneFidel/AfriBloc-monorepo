"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";

const categories = [
  { tab: "explore", text: "Explore deals" },
  { tab: "live", text: "Live" },
  { tab: "fully-funded", text: "Fully funded" },
  { tab: "opening-soon", text: "Opening soon" },
];

export default function CategoryTabs() {
  const [selectedCategory, setSelectedCategory] = useState("explore");

  return (
    <div className="flex w-[60%] items-center justify-start overflow-x-auto whitespace-nowrap">
      {categories.map((category, idx) => (
        <button
          key={idx}
          className={cn(
            "flex flex-shrink-0 items-center justify-center gap-x-2 px-2 md:px-8 h-10 text-sm transition-colors duration-300",
            selectedCategory === category.tab
              ? "border-Purple-500 text-Primary-500 border-b-2 font-medium"
              : "text-Gray-600 font-normal",
          )}
          onClick={() => setSelectedCategory(category.tab)}
        >
          {category.text}
        </button>
      ))}
    </div>
  );
}
