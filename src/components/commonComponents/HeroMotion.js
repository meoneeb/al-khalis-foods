"use client";

import { m } from "framer-motion";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { heroMotion } from "@/lib/motion";

export default function HeroMotion({ children, className = "" }) {
  const reduced = usePrefersReducedMotion();
  if (reduced) {
    return <div className={className}>{children}</div>;
  }
  return (
    <m.div
      className={className}
      variants={heroMotion.container}
      initial="hidden"
      animate="show"
    >
      {children}
    </m.div>
  );
}

export function HeroMotionItem({ children, className = "" }) {
  const reduced = usePrefersReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <m.div variants={heroMotion.item} className={className}>
      {children}
    </m.div>
  );
}
