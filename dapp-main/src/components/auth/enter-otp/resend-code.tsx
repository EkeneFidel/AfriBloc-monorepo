import { useTransition } from "react";
import useTimeLeft from "@/hooks/use-time-left";
import { sendOTPAction } from "@/lib/actions/auth.actions";
import { handleError, handleSuccess } from "@/lib/helpers";

export default function ResendCode({ email }: { email: string }) {
  const [isPending, startTransition] = useTransition();

  const { timeLeft, formatTime } = useTimeLeft(60);

  const handleCodeResend = async () => {
    startTransition(async () => {
      const rsp = await sendOTPAction({ email });
      if (rsp?.error) {
        handleError(rsp?.message);
      } else {
        handleSuccess(rsp?.message);
      }
    });
  };

  return (
    <div className="flex-between w-full">
      <button
        type="button"
        disabled={timeLeft > 0 || isPending}
        onClick={handleCodeResend}
        className="text-Gray-800 text-sm font-normal disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? "Resending..." : "Resend"}
      </button>
      <p className="text-Orange-500 font-medium">{formatTime(timeLeft)}</p>
    </div>
  );
}
