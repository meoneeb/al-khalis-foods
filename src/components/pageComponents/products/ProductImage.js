"use client";

import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";
import site from "@/data/site.json";

const PRODUCT_PLACEHOLDER =
  site.placeholders?.find((p) => p.type === "product")?.path ??
  "/images/placeholders/product-package.webp";

export default function ProductImage({
  src,
  alt,
  priority = false,
  className = "",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  variant = "default",
}) {
  const [failed, setFailed] = useState(false);
  const displaySrc = failed ? PRODUCT_PLACEHOLDER : src;
  const isThumb = variant === "thumb";

  return (
    <div
      className={clsx(
        "relative overflow-hidden bg-zinc-50",
        isThumb
          ? "h-24 w-24 shrink-0 rounded-lg border border-border"
          : "aspect-square w-full rounded-xl",
        !isThumb && "group",
        className,
      )}
    >
      <Image
        src={displaySrc}
        alt={alt}
        fill
        priority={priority}
        sizes={isThumb ? "48px" : sizes}
        className={clsx(
          "object-cover p-0 transition-transform duration-300",
          !isThumb && "group-hover:scale-105",
          isThumb && "p-0",
        )}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
