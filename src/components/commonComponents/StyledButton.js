import Link from "next/link";
import clsx from "clsx";

const sizes = {
  sm: "btn-sm",
  md: "btn-md",
  lg: "btn-lg",
};

const variants = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  onDark: "btn-on-dark",
  ghost: "btn-ghost",
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
    "btn-base",
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
