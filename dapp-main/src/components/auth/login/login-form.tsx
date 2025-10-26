"use client";

import Link from "next/link";
import OnboardingWrapper from "../create-an-account/onboarding-wrapper";
import SubmitButton from "@/components/ui/buttons/submit-button";
import useLogin from "../hooks/use-login";
import InputField from "@/components/ui/form/input-field";

export default function LoginForm() {
  const { register, onSubmit, formState } = useLogin();
  const { errors, isSubmitting } = formState;

  return (
    <OnboardingWrapper title="Log in to your Afribloc account" description="">
      <div className="mx-auto w-full max-w-[408px]">
        <form onSubmit={onSubmit} className="space-y-2 text-sm">
          <div className="space-y-3">
            <div className="space-y-3">
              <InputField
                label="Email address"
                name="identifier"
                type="email"
                placeholder="Enter your email"
                register={register("identifier")}
                errorMessage={errors.identifier}
              />

              <InputField
                label="Password"
                type="password"
                placeholder="Enter your password"
                {...register("password")}
                errorMessage={errors.password}
              />
            </div>

            <Link
              href="#"
              className="text-DarkGray hover:text-Orange-500 font-semibold hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <div className="space-y-4">
            <SubmitButton isSubmitting={isSubmitting} className="mt-7 w-full">
              Log In
            </SubmitButton>

            <p className="text-center text-gray-400">
              No account yet?{" "}
              <Link
                href="/create-an-account"
                className="text-Orange-500 font-semibold"
              >
                Create account
              </Link>
            </p>
          </div>
        </form>
      </div>
    </OnboardingWrapper>
  );
}
