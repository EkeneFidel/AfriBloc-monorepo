import CreatePassword from "@/components/auth/create-an-account/create-password";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create password",
};

export default function page() {
  return <CreatePassword />;
}
