"use client";

import Image from "next/image";
import { m } from "framer-motion";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

export default function SectionImage({
  src,
  alt,
  className = "",
  priority = false,
}) {
  const reduced = usePrefersReducedMotion();
  const Wrapper = reduced ? "div" : m.div;
  const motionProps = reduced
    ? {}
    : {
        initial: { opacity: 0, scale: 0.98 },
        whileInView: { opacity: 1, scale: 1 },
        viewport: { once: true, margin: "-40px" },
        transition: { duration: 0.5 },
      };

  return (
    <Wrapper
      {...motionProps}
      className={`relative aspect-[16/9] overflow-hidden rounded-2xl border border-zinc-200/60 shadow-lg ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
      />
    </Wrapper>
  );
}
