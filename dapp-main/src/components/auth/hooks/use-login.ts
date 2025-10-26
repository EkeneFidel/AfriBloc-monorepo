import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginSchemaType } from "../schemas";
import { signInAction } from "@/lib/actions/auth.actions";
import { handleError, handleSuccess } from "@/lib/helpers";

export default function useLogin() {
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect");
  const { push } = useRouter();
  const { register, handleSubmit, formState, reset } = useForm<LoginSchemaType>(
    {
      resolver: zodResolver(LoginSchema),
    },
  );

  const onSubmit = async (data: LoginSchemaType) => {
    try {
      const rsp = await signInAction(data);
      if (rsp?.error) {
        handleError(rsp?.message);
      } else {
        if (redirectPath) {
          handleSuccess(rsp?.message, push, redirectPath);
        } else {
          handleSuccess(rsp?.message, push, "/user");
        }
      }
    } catch (error) {
      console.log("Login error:", error);
    }
  };

  return {
    register,
    onSubmit: handleSubmit(onSubmit),
    formState,
    reset,
  };
}
