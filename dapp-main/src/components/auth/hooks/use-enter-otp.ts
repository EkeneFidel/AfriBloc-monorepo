import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EnterOTPSchema, EnterOTPSchemaType } from "../schemas";

export default function useEnterOTP({
  isEnterOTPView,
  setIsEnterOTPView,
  setOtp,
}: {
  isEnterOTPView?: boolean;
  setIsEnterOTPView?: (value: boolean) => void;
  setOtp: (value: string) => void;
}) {
  const { register, handleSubmit, formState } = useForm<EnterOTPSchemaType>({
    resolver: zodResolver(EnterOTPSchema),
  });

  const onSubmit = handleSubmit((data) => {
    if (isEnterOTPView) {
      setIsEnterOTPView?.(false);
      setOtp(data.otp);
    }
  });

  return { register, onSubmit, formState };
}
