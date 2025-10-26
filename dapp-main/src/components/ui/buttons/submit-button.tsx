import BaseButton from "./base-button";

interface SubmitButtonProps {
  children: React.ReactNode;
  isSubmitting?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function SubmitButton({
  children,
  isSubmitting,
  disabled,
  className,
}: SubmitButtonProps) {
  return (
    <BaseButton
      disabled={disabled}
      isSubmitting={isSubmitting}
      className={className}
    >
      {children}
    </BaseButton>
  );
}
