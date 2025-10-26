import CreateAnAccount from "@/components/auth/create-an-account/create-an-account";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create an account",
};

export default function page() {
  return <CreateAnAccount />;
}
