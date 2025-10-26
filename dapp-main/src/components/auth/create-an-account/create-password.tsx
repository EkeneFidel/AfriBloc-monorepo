"use client";
import SubmitButton from "@/components/ui/buttons/submit-button";
import useCreatePassword from "../hooks/use-create-password";
import OnboardingWrapper from "./onboarding-wrapper";
import InputField from "@/components/ui/form/input-field";
import PasswordCheck from "./password-check";

export default function CreatePassword() {
  const { register, onSubmit, formState, passwordCheck } = useCreatePassword();
  const { errors, isSubmitting } = formState;

  return (
    <OnboardingWrapper
      title="Create password"
      description="Create a unique password"
    >
      <form onSubmit={onSubmit} className="space-y-8 text-sm">
        <div className="space-y-3">
          <InputField
            label="Password"
            type="password"
            {...register("password")}
            errorMessage={errors.password}
          />

          <PasswordCheck passwordCheck={passwordCheck} />

          <InputField
            label="Confirm Password"
            type="password"
            {...register("confirmPassword")}
            errorMessage={errors.confirmPassword}
          />
        </div>
        <SubmitButton isSubmitting={isSubmitting} className="mt-7 w-full">
          Continue
        </SubmitButton>
      </form>
    </OnboardingWrapper>
  );
}
