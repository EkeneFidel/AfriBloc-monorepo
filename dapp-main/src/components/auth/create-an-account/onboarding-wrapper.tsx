"use client";

import { ReactNode } from "react";

type OnboardingWrapperProps = {
  title: string;
  description: string | ReactNode;
  children: ReactNode;
};

export default function OnboardingWrapper({
  title,
  description,
  children,
}: OnboardingWrapperProps) {
  return (
    <div className="w-full space-y-8 p-4">
      <div className="text-Gray-900 space-y-1 text-center">
        <h2 className="max-w-[250px] md:max-w-[330px] text-center text-3xl font-bold lg:text-[40px] lg:leading-[100%] mx-auto">
          {title}
        </h2>
        {description && (
          <div className="text-sm font-normal">{description}</div>
        )}
      </div>

      {children}
    </div>
  );
}
