"use client";

import Link from "next/link";
import useCreateAccount from "../hooks/use-create-account";
import OnboardingWrapper from "./onboarding-wrapper";
import SubmitButton from "@/components/ui/buttons/submit-button";
import InputField from "@/components/ui/form/input-field";

export default function CreateAnAccount() {
  const { register, formState, onSubmit } = useCreateAccount();
  const { errors, isSubmitting } = formState;

  return (
    <OnboardingWrapper title="Create an Afribloc account" description="">
      <form onSubmit={onSubmit} className="space-y-2 text-sm">
        <InputField
          label="First name"
          name="firstName"
          placeholder="Enter your first name"
          register={register("firstName")}
          errorMessage={errors.firstName}
        />
        <InputField
          label="Last name"
          name="lastName"
          placeholder="Enter your last name"
          register={register("lastName")}
          errorMessage={errors.lastName}
        />

        {/* Email Input */}
        <InputField
          label="Email address"
          name="email"
          type="email"
          placeholder="Enter your email"
          register={register("email")}
          errorMessage={errors.email}
        />

        {/* Terms and Conditions */}
        <div className="text-Gray-600 text-xs">
          <p>
            By registering, you accept our{" "}
            <Link href="/terms" className="text-Gray-700 font-medium underline">
              Terms of Use
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy-notice"
              className="text-Gray-700 font-medium underline"
            >
              Privacy Policy
            </Link>
          </p>
        </div>

        {/* Submit Button */}
        <SubmitButton isSubmitting={isSubmitting} className="mt-7 w-full">
          Create account
        </SubmitButton>

        {/* Login Link */}
        <div className="text-center text-sm">
          <span className="text-Gray-500">Already have an account? </span>
          <Link href="/login" className="text-Orange-500 font-semibold">
            Login
          </Link>
        </div>
      </form>
    </OnboardingWrapper>
  );
}
