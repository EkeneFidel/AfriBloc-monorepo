import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useCheckPassword from "@/hooks/use-check-password";
import { SignUpSchema, SignUpSchemaType } from "../schemas";
import { useOnboardingContext } from "@/contexts/onboardingContext";
import { signupAction } from "@/lib/actions/auth.actions";
import { handleError, handleSuccess } from "@/lib/helpers";
import { useRouter } from "next/navigation";

export default function useCreatePassword() {
  const { push } = useRouter();
  const { userFormData } = useOnboardingContext();

  const { register, handleSubmit, formState, watch } =
    useForm<SignUpSchemaType>({
      resolver: zodResolver(SignUpSchema),
      defaultValues: {
        ...userFormData,
        password: "",
        confirmPassword: "",
      },
    });

  const { passwordCheck, isDisabled } = useCheckPassword(watch("password"));

  const onSubmit = handleSubmit(async (data) => {
    if (!isDisabled) {
      try {
        const rsp = await signupAction(data);
        if (rsp?.error) {
          handleError(rsp?.message);
        } else {
          handleSuccess(rsp?.message, push, "/account-created-successful");
        }
      } catch (error) {
        console.log("Create user error:", error);
      }
    }
  });

  return { register, onSubmit, formState, passwordCheck };
}
