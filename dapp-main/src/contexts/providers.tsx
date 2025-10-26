"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CurrencyProvider from "./currencyProvider";

const queryClient = new QueryClient();
export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <CurrencyProvider>{children}</CurrencyProvider>
    </QueryClientProvider>
  );
};
