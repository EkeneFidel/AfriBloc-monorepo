import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EnterOTPSchema, EnterOTPSchemaType } from "../schemas";
import { useOnboardingContext } from "@/contexts/onboardingContext";
import { verifyEmailAction } from "@/lib/actions/auth.actions";
import { handleError, handleSuccess } from "@/lib/helpers";
import { useRouter } from "next/navigation";

export default function useVerifyEmailAddress() {
  const { push } = useRouter();
  const { userFormData } = useOnboardingContext();
  const { register, handleSubmit, formState } = useForm<EnterOTPSchemaType>({
    resolver: zodResolver(EnterOTPSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    const verifyOTPData = {
      email: userFormData.email,
      otp: data.otp,
    };

    try {
      const rsp = await verifyEmailAction(verifyOTPData);
      if (rsp?.error) {
        handleError(rsp?.message);
      } else {
        handleSuccess(rsp?.message, push, "/create-password");
      }
    } catch (error) {
      console.log("Something went wrong", error);
    }
  });

  return { register, onSubmit, formState };
}
