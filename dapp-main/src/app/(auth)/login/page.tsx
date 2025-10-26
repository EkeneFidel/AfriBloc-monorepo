import LoginForm from "@/components/auth/login/login-form";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Log in",
};

export default function page() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
