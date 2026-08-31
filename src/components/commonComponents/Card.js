import clsx from "clsx";

const VARIANTS = {
  default: "card",
  body: "card card-body",
  compact: "card card-body-compact",
  dark: "card-dark",
  highlight: "card-highlight",
  panel: "panel panel-body",
};

export default function Card({
  children,
  variant = "default",
  interactive = false,
  className,
  as: Tag = "article",
}) {
  return (
    <Tag
      className={clsx(
        VARIANTS[variant] ?? VARIANTS.default,
        interactive && "card-interactive",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
