"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function HeaderLink({
  item,
}: {
  item: { path: string; text: string };
}) {
  const pathname = usePathname();
  const isActive = pathname.includes(item.path);

  return (
    <Link
      key={item.text}
      href={item.path}
      className={cn(
        "hover:text-Purple-600 text-medium px-4 text-base transition-colors duration-300 hover:font-semibold",
        isActive
          ? "text-Purple-500 font-semibold"
          : "text-Gray-900 font-medium",
      )}
    >
      {item.text}
    </Link>
  );
}
