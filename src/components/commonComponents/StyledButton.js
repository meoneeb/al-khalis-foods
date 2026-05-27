import Link from "next/link";
import clsx from "clsx";

const base =
  "inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-saffron";

const variants = {
  primary:
    "border border-amber-400 bg-amber-500 text-brand-cream shadow-xl shadow-amber-500/35 hover:border-amber-600 hover:bg-amber-600 ",
  secondary:
    "border-2 border-brand-sand bg-brand-card text-brand-cream shadow-xl shadow-black/35 hover:border-brand-spice hover:bg-brand-elevated hover:text-shadow-white",
  ghost:
    "border border-brand-line bg-brand-elevated text-brand-cream shadow-xl shadow-black/25 hover:border-brand-sand hover:bg-brand-sand",
};

export default function StyledButton({
  variant = "primary",
  href,
  className,
  children,
  type = "button",
  ...props
}) {
  const classes = clsx(base, variants[variant] ?? variants.primary, className);

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
