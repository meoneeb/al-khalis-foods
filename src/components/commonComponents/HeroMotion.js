"use client";

import { m } from "framer-motion";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function HeroMotion({ children, className = "" }) {
  const reduced = usePrefersReducedMotion();
  if (reduced) {
    return <div className={className}>{children}</div>;
  }
  return (
    <m.div
      className={className}
      variants={stagger}
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
    <m.div variants={fadeUp} className={className}>
      {children}
    </m.div>
  );
}
