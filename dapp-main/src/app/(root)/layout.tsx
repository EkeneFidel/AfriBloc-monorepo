"use client"
import Footer from "@/components/main/footer/footer";
import Header from "@/components/main/header/header";
import { usePathname } from "next/navigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const headerWhere = pathname === "/" ? "home" : "others";

  return (
    <>
      <Header where={headerWhere} />
      {children}
      <Footer />
    </>
  );
}
