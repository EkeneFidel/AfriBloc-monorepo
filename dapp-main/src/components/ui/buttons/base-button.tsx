"use client";

import { useFormStatus } from "react-dom";
import { ButtonHTMLAttributes, forwardRef, ReactNode, Ref } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";

type CommonProps = {
  children: ReactNode;
  className?: string;
  isSubmitting?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

type ButtonProps =
  | (CommonProps & {
      type?: "button" | "submit" | "reset";
      href?: never; // Ensures href is not allowed for button
    } & ButtonHTMLAttributes<HTMLButtonElement>)
  | (CommonProps & {
      href: string; // Ensures href is required for links
      type?: never; // Prevents type from being used in Link
    });

const BaseButton = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button(
  {
    children,
    className,
    isSubmitting,
    type = "submit",
    href,
    onClick,
    disabled,
    ...rest
  },
  ref: Ref<HTMLButtonElement | HTMLAnchorElement>,
) {
  const { pending } = useFormStatus();
  const isPending = pending && type === "submit";

  const styles = `disabled:cursor-not-allowed w-fit text-center rounded-full bg-Purple-500 hover:bg-Purple-500/50 transition-colors px-2 py-3 text-sm font-medium text-white disabled:opacity-50 ${
    isSubmitting || isPending ? "flex items-center justify-center gap-2" : ""
  } ${className || ""}`;

  if (href) {
    return (
      <Link href={href} ref={ref as Ref<HTMLAnchorElement>} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button
      ref={ref as Ref<HTMLButtonElement>}
      onClick={onClick}
      type={type}
      disabled={disabled || isSubmitting || isPending}
      className={styles}
      {...rest}
    >
      {isSubmitting || isPending ? null : children}
      {(isSubmitting || isPending) && (
        <div className="flex items-center gap-2">
          <Loader2 className="size-4 animate-spin" />
          <span className="text-sm">Submitting...</span>
        </div>
      )}
    </button>
  );
});

export default BaseButton;
