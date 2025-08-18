import { twMerge } from "tailwind-merge";

type FormInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  ref?: React.Ref<HTMLInputElement>;
  isError?: boolean;
};

export function FormInput({
  type,
  isError = false,
  className,
  ref,
  ...rest
}: FormInputProps) {
  return (
    <input
      ref={ref}
      {...rest}
      type={type}
      className={twMerge(
        "h-11 rounded-[10px] border-0 p-3 text-sm text-black shadow-none ring-1 ring-[#E4E4E4] focus:ring-2 focus:ring-bg-primary disabled:cursor-not-allowed disabled:bg-[#F1F1F4] disabled:text-[#A5A5AA] disabled:placeholder:text-[#A5A5AA] lg:text-base",
        isError && "hasErrors ring-red-500 focus:ring-red-500",
        className
      )}
    />
  );
}
