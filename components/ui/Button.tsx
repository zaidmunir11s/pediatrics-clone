import type { ComponentPropsWithoutRef } from "react";

export type ButtonVariant =
  | "primary"
  | "lavender"
  | "header"
  | "preorder"
  | "amber";

const variants: Record<ButtonVariant, string> = {
  // Kadence global fill button: #B140EC → hover palette1 #7F1AA6.
  primary:
    "bg-purple-cta text-white hover:bg-[#7f1aa6] rounded-[50px] px-[25px] py-3 text-base font-medium capitalize",
  header:
    "bg-purple-cta text-white hover:bg-[#7f1aa6] rounded-[50px] px-[25px] py-[14px] text-base font-medium uppercase",
  lavender:
    "bg-lavender text-black hover:bg-purple-cta hover:text-white rounded-[50px] px-[25px] py-[14px] text-base font-medium uppercase",
  preorder:
    "bg-purple-deep text-white transition-[transform,box-shadow,background-color] duration-150 hover:-translate-y-[3px] hover:scale-[1.03] hover:bg-[#ec008c] hover:shadow-[0_10px_24px_rgba(236,0,140,0.45)] rounded-full px-9 py-[14px] text-lg font-extrabold",
  amber:
    "bg-amber text-ink-900 rounded-full px-5 py-[7px] text-[17px] font-extrabold",
};

type Props = ComponentPropsWithoutRef<"a"> & {
  variant?: ButtonVariant;
  chevron?: boolean;
};

export function Chevron({ className = "w-[9px]" }: { className?: string }) {
  // Font Awesome "angle-right", as used by the reference buttons.
  return (
    <svg
      viewBox="0 0 256 512"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z" />
    </svg>
  );
}

export function Button({
  variant = "primary",
  chevron = false,
  className = "",
  children,
  ...rest
}: Props) {
  return (
    <a
      className={`inline-flex items-center justify-center gap-2 leading-[1.6] transition-colors duration-300 ease-in-out ${variants[variant]} ${className}`}
      {...rest}
    >
      <span>{children}</span>
      {chevron && (
        <span className="flex w-[18px] justify-center">
          <Chevron />
        </span>
      )}
    </a>
  );
}
