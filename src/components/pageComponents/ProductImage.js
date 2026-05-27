"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { getCategoryPlaceholder } from "@/lib/products";

const ROTATE_STEPS = [-3, -2.5, -2, -1.5, -1, 1, 1.5, 2, 2.5, 3];

function rotationFromSeed(seed) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return ROTATE_STEPS[Math.abs(hash) % ROTATE_STEPS.length];
}

export default function ProductImage({
  src,
  alt,
  category,
  priority = false,
  className = "",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
}) {
  const [failed, setFailed] = useState(false);
  const displaySrc = failed ? getCategoryPlaceholder(category) : src;
  const rotateDeg = useMemo(
    () => rotationFromSeed(src || alt || category || ""),
    [src, alt, category],
  );

  return (
    <div
      className={`relative aspect-[4.7/5] overflow-hidden rounded-xl bg-brand-card ${className} group`}
    >
      <Image
        src={displaySrc}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-contain transition-transform duration-300 group-hover:scale-110"
        style={{ transform: `rotate(${rotateDeg}deg)` }}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
