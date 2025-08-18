import type { LabelHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type FormLabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export function FormLabel({ className, children, ...rest }: FormLabelProps) {
  return (
    <label
      {...rest}
      className={twMerge(
        "cursor-pointer text-sm font-medium text-heading-primary",
        className
      )}
    >
      {children}
    </label>
  );
}
