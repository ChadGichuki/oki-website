import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "dark" | "outline" | "outline-light";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-sans font-medium whitespace-nowrap " +
  "transition-colors duration-200 ease-reveal disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  // Orange buttons always carry ink text (contrast ~6:1).
  primary: "bg-brand text-ink hover:bg-ink hover:text-paper",
  dark: "bg-ink text-paper hover:bg-brand hover:text-ink",
  outline: "border border-ink text-ink hover:bg-ink hover:text-paper",
  "outline-light": "border border-paper text-paper hover:bg-paper hover:text-ink",
};

const sizes: Record<Size, string> = {
  md: "min-h-btn-md px-5 text-[15px]",
  lg: "min-h-btn-lg px-7 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type LinkButtonProps = CommonProps & {
  href: string;
  /** Opens in a new tab with rel="noopener noreferrer". */
  external?: boolean;
  onClick?: never;
  type?: never;
};

type NativeButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
    external?: never;
  };

export type ButtonProps = LinkButtonProps | NativeButtonProps;

/**
 * Pill button. Renders a real <a> when given `href`, otherwise a <button>.
 * Primary defaults to 52px tall; everything else is at least 44px.
 */
export function Button(props: ButtonProps) {
  const { variant = "primary", className = "", children } = props;
  const size = props.size ?? (variant === "primary" ? "lg" : "md");
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (props.href !== undefined) {
    const { href, external } = props;
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, type = "button", ...rest } = props;
  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
