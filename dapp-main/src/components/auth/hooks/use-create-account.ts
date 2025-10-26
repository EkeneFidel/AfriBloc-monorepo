import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema } from "../schemas";
import { useOnboardingContext } from "@/contexts/onboardingContext";
import { sendOTPAction } from "@/lib/actions/auth.actions";
import { handleError, handleSuccess } from "@/lib/helpers";
import { useRouter } from "next/navigation";

const CreateAccountSchema = SignUpSchema.pick({
  firstName: true,
  lastName: true,
  email: true,
});

type CreateAccountSchemaType = z.infer<typeof CreateAccountSchema>;

export default function useCreateAccount() {
  const { push } = useRouter();
  const { handleAuthData } = useOnboardingContext();

  const { register, handleSubmit, formState } =
    useForm<CreateAccountSchemaType>({
      resolver: zodResolver(CreateAccountSchema),
    });

  const onSubmit = async (data: CreateAccountSchemaType) => {
    handleAuthData(data);

    try {
      const rsp = await sendOTPAction({ email: data?.email });
      if (rsp?.error) {
        handleError(rsp?.message);
      } else {
        handleSuccess(rsp?.message, push, "/verify-email");
      }
    } catch (error) {
      console.log("Generate-otp-error:", error);
    }
  };

  return {
    register,
    onSubmit: handleSubmit(onSubmit),
    formState,
  };
}
