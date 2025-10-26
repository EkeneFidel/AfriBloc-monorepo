import { ReactNode } from "react";

const Field = ({
  title,
  value,
  className,
  wrapperClassName,
  titleClassName,
}: {
  title: string | ReactNode;
  value: string | ReactNode;
  className?: string;
  wrapperClassName?: string;
  titleClassName?: string;
}) => {
  return (
    <div className={`flex w-full items-center gap-3 ${wrapperClassName}`}>
      <h5 className={`text-Gray-700 w-4/12 text-sm ${titleClassName}`}>
        {title}
      </h5>

      {typeof value === "string" ? (
        <h5
          className={`text-Gray-900 flex-1 text-sm whitespace-break-spaces ${className}`}
        >
          {value}
        </h5>
      ) : (
        value
      )}
    </div>
  );
};

export default Field;
