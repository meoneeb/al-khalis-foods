import Link from "next/link";
import clsx from "clsx";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500";

const sizes = {
  sm: "rounded-xl px-4 py-2 text-xs",
  md: "rounded-2xl px-6 py-3 text-sm",
  lg: "rounded-2xl px-8 py-3.5 text-base",
};

const variants = {
  primary:
    "border border-red-500 bg-red-500 text-white shadow-lg shadow-red-500/25 hover:border-red-600 hover:bg-red-600",
  secondary:
    "border-2 border-zinc-200 bg-white text-zinc-900 shadow-sm hover:border-red-500 hover:bg-stone-100",
  onDark:
    "border-2 border-white/35 bg-white/10 text-zinc-50 backdrop-blur-sm hover:border-white/55 hover:bg-white/15",
  ghost:
    "border border-zinc-200 bg-stone-100 text-zinc-900 hover:border-red-500 hover:bg-stone-200",
};

export default function StyledButton({
  variant = "primary",
  size = "md",
  href,
  className,
  children,
  type = "button",
  ...props
}) {
  const classes = clsx(
    base,
    sizes[size] ?? sizes.md,
    variants[variant] ?? variants.primary,
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
