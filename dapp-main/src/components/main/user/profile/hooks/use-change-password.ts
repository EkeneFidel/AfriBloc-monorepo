"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useCheckPassword from "@/hooks/use-check-password";
import { ChangePasswordSchema, ChangePasswordSchemaType } from "../schemas";
import { useState } from "react";
import { handleError, handleSuccess } from "@/lib/helpers";
import { changePasswordAction } from "@/lib/actions/auth.actions";

export default function useChangePassword() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { register, handleSubmit, formState, watch } =
    useForm<ChangePasswordSchemaType>({
      resolver: zodResolver(ChangePasswordSchema),
      defaultValues: {
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      },
    });

  const { passwordCheck, isDisabled } = useCheckPassword(watch("newPassword"));

  const onSubmit = handleSubmit(async (data) => {
    if (!isDisabled) {
      try {
        const rsp = await changePasswordAction({
          oldPassword: data?.currentPassword,
          newPassword: data?.newPassword,
        });
        if (rsp?.error) {
          handleError(rsp?.message);
        } else {
          setIsModalOpen(false);
          handleSuccess(rsp?.message);
        }
      } catch (error) {
        console.log("Login error:", error);
      }
    }
  });

  return {
    register,
    onSubmit,
    formState,
    passwordCheck,
    isModalOpen,
    setIsModalOpen,
  };
}
