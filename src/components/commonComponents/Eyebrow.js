import clsx from "clsx";

export default function Eyebrow({
  children,
  variant = "accent",
  align = "left",
  className,
}) {
  return (
    <p
      className={clsx(
        "eyebrow",
        variant === "accent" && "eyebrow-accent",
        variant === "muted" && "eyebrow-muted",
        align === "center" && "text-center",
        className,
      )}
    >
      {children}
    </p>
  );
}
