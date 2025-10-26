"use client";

import BaseButton from "@/components/ui/buttons/base-button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useChangePassword from "../hooks/use-change-password";
import InputField from "@/components/ui/form/input-field";
import PasswordCheck from "@/components/auth/create-an-account/password-check";
import SubmitButton from "@/components/ui/buttons/submit-button";

export default function ChangePasswordModal() {
  const {
    register,
    onSubmit,
    formState,
    passwordCheck,
    isModalOpen,
    setIsModalOpen,
  } = useChangePassword();
  const { errors, isSubmitting } = formState;

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <BaseButton className="!text-Purple-500 border-Gray-50 w-full border !bg-white px-2 !text-sm md:!text-base lg:w-fit lg:px-10">
          Change Password
        </BaseButton>
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        className="max-h-[98vh] overflow-auto"
      >
        <DialogHeader className="pb-2">
          <DialogTitle className="!text-center text-base font-semibold">
            Change Password
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-8 text-sm">
          <div className="space-y-3">
            <InputField
              label="Current Password"
              type="password"
              {...register("currentPassword")}
              placeholder="Enter password"
              errorMessage={errors.currentPassword}
            />
            <InputField
              label="New Password"
              type="password"
              {...register("newPassword")}
              placeholder="Enter password"
              errorMessage={errors.newPassword}
            />

            <PasswordCheck passwordCheck={passwordCheck} />

            <InputField
              label="Confirm New Password"
              type="password"
              {...register("confirmNewPassword")}
              placeholder="Enter password"
              errorMessage={errors.confirmNewPassword}
            />
          </div>
          <SubmitButton isSubmitting={isSubmitting} className="mt-3 w-full">
            Change password
          </SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}
