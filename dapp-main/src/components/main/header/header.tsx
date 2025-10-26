"use client";

import AppLogo from "@/components/ui/app-logo/app-logo";
import { cn } from "@/lib/utils";
import { navRoutes } from "./route";
import BaseButton from "@/components/ui/buttons/base-button";
import MobileNavMenu from "./mobile-nav-menu";
import { useEffect, useState } from "react";

interface HeaderProps {
  where: "home" | "others";
}

export default function Header({ where = "home" }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      const sections = navRoutes.map((route) =>
        document.getElementById(route.path.substring(1)),
      );

      let currentSection = "";
      sections.forEach((section) => {
        if (section) {
          const top = section.offsetTop - 100;
          const bottom = top + section.offsetHeight;

          if (window.scrollY >= top && window.scrollY < bottom) {
            currentSection = section.id;
          }
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "w-full overflow-hidden px-4",
        where === "home"
          ? "home-header"
          : "border-Gray-25 sticky top-0 z-50 border-b py-4 lg:py-0",
        isScrolled ? "bg-white !pb-2" : "",
        where === "home" && activeSection === "how-it-works"
          ? "relative"
          : "fixed",
      )}
    >
      <div className="flex-between lg:pl-14">
        <div
          className={cn(
            "flex-start gap-16",
            !isScrolled && where === "home" ? "lg:my-8" : "lg:my-4",
          )}
        >
          <AppLogo />
          <nav className="hidden items-center space-x-8 lg:flex">
            {navRoutes.map((link, idx) => (
              <a
                key={idx}
                href={link.path}
                className={cn(
                  "hover:text-Purple-500 text-base font-medium transition-colors duration-300",
                  activeSection === link.path.substring(1)
                    ? "text-Purple-500"
                    : "text-Gray-900",
                )}
              >
                {link.text}
              </a>
            ))}
          </nav>
        </div>
        <div
          className={cn(
            "relative hidden h-20 items-center justify-end space-x-4 rounded-bl-2xl pr-12 lg:flex",
            isScrolled ? "" : "pb-4",
          )}
        >
          <BaseButton
            href="/login"
            className="!text-Gray-900 border-Gray-50 border !bg-white px-8 !text-base"
          >
            Log In
          </BaseButton>
          <BaseButton href="/user" className="px-8 !text-base">
            Own a Bloc
          </BaseButton>
        </div>
        <MobileNavMenu />
      </div>
    </header>
  );
}
