import clsx from "clsx";

export default function Chip({
  children,
  icon: Icon,
  className,
  as: Tag = "span",
  ...props
}) {
  return (
    <Tag className={clsx("chip", className)} {...props}>
      {Icon ? <Icon className="h-4 w-4 text-brand" aria-hidden /> : null}
      {children}
    </Tag>
  );
}
