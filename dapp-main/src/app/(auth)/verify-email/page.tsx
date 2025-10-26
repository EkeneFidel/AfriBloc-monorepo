import VerifyEmailAddress from "@/components/auth/create-an-account/verify-email-address";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify email",
};

export default function page() {
  return <VerifyEmailAddress />;
}
