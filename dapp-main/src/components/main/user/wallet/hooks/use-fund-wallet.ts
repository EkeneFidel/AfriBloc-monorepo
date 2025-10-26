"use client";

import { useMemo, useState } from "react";
import { FundWalletSchema, FundWalletSchemaType } from "../schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { showToast } from "@/lib/toast";
import { getHBARRates } from "@/services/apis/properties.api";
import { useQuery } from "@tanstack/react-query";
import { useCurrencyContext } from "@/contexts/currencyProvider";
export type Value = "amount" | "qty";

export default function useFundWallet() {
  const { currency } = useCurrencyContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const { refresh } = useRouter();
  const { handleSubmit, watch } = useForm<FundWalletSchemaType>({
    resolver: zodResolver(FundWalletSchema),
    defaultValues: {
      amount: undefined,
      paymentMethod: "",
    },
  });

  const { data } = useQuery({
    queryKey: ["hbar-rates", currency],
    queryFn: () => getHBARRates(currency === "₦" ? "ngn" : "usd"),
    enabled: !!currency,
  });

  const HBARRate = data?.ok ? data?.body?.data?.rate : null;

  const onSubmit = handleSubmit(async (data) => {
    try {
      showToast("Wallet funded successfully");

      setIsModalOpen(false);
    } catch {
      showToast("Something went wrong", "error");
    }
  });

  const [value, setValue] = useState({
    amount: "100",
    qty: "1",
  });

  const [errors, setErrors] = useState({
    amount: "",
    qty: "",
  });

  const increase = (type: Value) => {
    setValue((prev) => {
      const newValue = Number(prev[type]) + 1;
      return {
        ...prev,
        [type]: String(newValue),
      };
    });
  };

  const decrease = (type: Value) => {
    setValue((prev) => {
      const newValue = Number(prev[type]) - Number(prev[type]) + 1;
      return {
        ...prev,
        [type]: String(newValue),
      };
    });
  };

  const handleValueChange = (type: Value, val: string) => {
    if (val === "") {
      setValue((prev) => ({
        ...prev,
        [type]: "",
      }));
      setErrors((prev) => ({ ...prev, [type]: "" }));
      return;
    } else {
      setValue((prev) => ({
        ...prev,
        [type]: val,
      }));
    }
  };

  const convertAmount = useMemo(() => {
    return HBARRate
      ? parseFloat(value?.amount?.toString()) * HBARRate
      : value?.amount;
  }, [HBARRate, value?.amount, currency]);

  return {
    value,
    errors,
    increase,
    decrease,
    handleValueChange,
    isModalOpen,
    setIsModalOpen,
    setValue,
    watch,
    onSubmit,
    convertAmount,
  };
}
