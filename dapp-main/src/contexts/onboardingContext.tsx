"use client";

import { SignUp } from "@/types/auth";
import { createContext, useState, use, ReactNode, useEffect } from "react";

type OnboardingContextType = {
  userFormData: SignUp;
  handleAuthData: (data: Partial<SignUp>) => void;
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined,
);

export default function OnboardingProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [userFormData, setUserFormData] = useState<SignUp>(() => {
    // Load user data from localStorage if available
    const storedUserData =
      typeof window !== "undefined" ? localStorage.getItem("userData") : null;
    return storedUserData ? JSON.parse(storedUserData) : ({} as SignUp);
  });

  useEffect(() => {
    // Save user data to localStorage whenever it changes
    localStorage.setItem("userData", JSON.stringify(userFormData));
  }, [userFormData]);

  const handleAuthData = (
    data: Partial<OnboardingContextType["userFormData"]>,
  ) => {
    setUserFormData((prev) => ({ ...prev, ...data }));
  };

  const value = {
    userFormData,
    handleAuthData,
  };

  return <OnboardingContext value={value}>{children}</OnboardingContext>;
}

export function useOnboardingContext() {
  const context = use(OnboardingContext);

  if (context === undefined) {
    throw new Error(
      "useOnboardingContext must be used within an OnboardingProvider",
    );
  }

  return context;
}
