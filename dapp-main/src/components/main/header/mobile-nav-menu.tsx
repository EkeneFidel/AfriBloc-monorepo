"use client";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { navRoutes } from "./route";
import BaseButton from "@/components/ui/buttons/base-button";

export default function MobileNavMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleClickOutside: EventListener = (event) => {
        if (
          modalRef.current &&
          !modalRef.current.contains(event.target as Node)
        ) {
          setIsMenuOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, []);

  return (
    <React.Fragment>
      {!isMenuOpen && (
        <button
          aria-label="Toggle mobile navigation"
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="text-Gray-900 lg:hidden"
        >
          <svg
            className="size-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      )}
      <div
        className={cn(
          "fixed top-0 z-40 flex h-screen w-full justify-start gap-7 bg-black/40 transition-all duration-300 lg:hidden",
          isMenuOpen ? "left-0" : "-left-full",
        )}
      >
        <div
          ref={modalRef}
          className="text-Gray-900 flex h-full w-[250px] flex-col items-start justify-between bg-white py-4"
        >
          <nav className="flex w-full flex-col items-start justify-start gap-6">
            <div className="flex w-full items-center justify-end gap-6 px-4">
              <button
                aria-label="Close mobile navigation"
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full border"
                onClick={() => setIsMenuOpen(false)}
              >
                <X size={25} />
              </button>
            </div>
            <nav className="col-start w-full">
              {navRoutes.map((link, idx) => (
                <a
                  key={idx}
                  href={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="border-Gray-50 hover:text-Purple-500 w-full border-b px-4 py-4 font-medium transition-colors"
                >
                  {link.text}
                </a>
              ))}
            </nav>
            <div className="col-start w-full gap-5 px-4">
              <BaseButton
                href="/login"
                className="!text-Gray-900 border-Gray-50 w-full border !bg-white px-8 !text-base"
              >
                Log In
              </BaseButton>
              <BaseButton
                href="/create-an-account"
                className="w-full px-8 !text-base"
              >
                Own a Bloc
              </BaseButton>
            </div>
          </nav>
        </div>
      </div>
    </React.Fragment>
  );
}
