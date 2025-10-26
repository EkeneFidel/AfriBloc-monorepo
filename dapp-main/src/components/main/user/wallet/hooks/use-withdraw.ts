"use client";

import { showToast } from "@/lib/toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { WithdrawSchema, WithdrawSchemaType } from "../schemas";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function useWithdraw() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { refresh } = useRouter();
  const {
    register,
    handleSubmit,
    formState,
    watch,
    setValue,
    trigger,
    reset,
    control,
  } = useForm<WithdrawSchemaType>({
    resolver: zodResolver(WithdrawSchema),
    defaultValues: {
      amount: undefined,
      destination: "",
      network: "all",
      walletAddress: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log("🚀 ~ useWithdraw ~ data:", data);
    try {
      showToast("Withdrawal successful");
      refresh();
      setIsModalOpen(false);
      reset();
    } catch {
      showToast("Something went wrong", "error");
    }
  });

  return {
    register,
    onSubmit,
    formState,
    isModalOpen,
    setIsModalOpen,
    watch,
    setValue,
    trigger,
    control,
  };
}
