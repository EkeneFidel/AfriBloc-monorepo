import { InputHTMLAttributes, useState } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { cn } from "@/lib/utils";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  register?: UseFormRegisterReturn<string>;
  errorMessage?: FieldError;
  inputClassName?: string;
  className?: string;
  showLabel?: boolean;
  required?: boolean;
};

export default function InputField({
  label,
  name,
  placeholder,
  register,
  errorMessage,
  type,
  inputClassName,
  className,
  showLabel = true,
  required = false,
  ...props
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={cn("flex flex-col gap-y-1.5", className)}>
      {showLabel && (
        <label
          htmlFor={name}
          className="text-Gray-900 text-sm font-normal md:text-base"
        >
          {label}{" "}
          {required && (
            <span className="text-xs text-red-500 md:text-sm">*</span>
          )}
        </label>
      )}
      <div className="relative h-12">
        <input
          id={name}
          name={name}
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          autoComplete={name}
          className={cn(
            "focus:border-Orange-500 focus:ring-Orange-500 border-BlueGray-200 placeholder:text-Gray-400 disabled:bg-Gray-700 disabled:text-Gray-400 w-full rounded border px-4 py-2.5 focus:outline-none",
            inputClassName,
            errorMessage ? "border-Red-500 focus:border-Red-500" : "",
          )}
          placeholder={placeholder}
          {...register}
          {...props}
        />
        {type === "password" && (
          <button
            type="button"
            className={`text-Orange-500 absolute top-[45%] right-3.5 -translate-y-1/2 select-none`}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        )}
      </div>
      {errorMessage && (
        <p className="text-Red-500 text-xs md:text-sm">
          {errorMessage.message}
        </p>
      )}
    </div>
  );
}
