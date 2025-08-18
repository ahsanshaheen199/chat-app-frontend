import { twMerge } from "tailwind-merge";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
};

export function Button({
  className,
  children,
  isLoading,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={twMerge(
        twMerge(
          "inline-flex cursor-pointer items-center justify-center font-semibold rounded-[10px] bg-bg-primary px-5 py-3 text-sm text-white disabled:opacity-50 lg:text-base",
          isLoading && "gap-x-2",
          className
        )
      )}
    >
      {isLoading && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-spin"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
        </svg>
      )}
      {children}
    </button>
  );
}
