"use client";

import { getRates } from "@/services/apis/properties.api";
import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useContext, useState } from "react";

type CurrencyTypes = {
  usdNGNRate: number;
  currency: string;
  setCurrency: (val: string) => void;
};

const CurrencyContext = createContext<CurrencyTypes>({} as CurrencyTypes);

export default function CurrencyProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { data } = useQuery({
    queryKey: ["rates"],
    queryFn: () => getRates("usd", "ngn"),
  });
  const [currency, setCurrency] = useState("$");

  const usdNGNRate = data?.ok ? data?.body?.data?.rate : 1500;
  const value = {
    currency,
    setCurrency,
    usdNGNRate,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrencyContext() {
  const context = useContext(CurrencyContext);

  if (context === undefined) {
    throw new Error(
      "useCurrencyContext must be used within a CurrencyProvider",
    );
  }

  return context;
}
