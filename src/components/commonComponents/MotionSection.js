"use client";

import { m } from "framer-motion";
import clsx from "clsx";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

const TONE_CLASS = {
  light: "section-tone-light",
  stone: "section-tone-stone",
  dark: "section-tone-dark",
};

export default function MotionSection({
  children,
  className = "",
  containerClassName = "",
  tone = "light",
}) {
  const reduced = usePrefersReducedMotion();
  const sectionClass = clsx("w-full", TONE_CLASS[tone] ?? TONE_CLASS.light, className);
  const innerClass = `section-container py-8 md:py-12 ${containerClassName}`.trim();

  if (reduced) {
    return (
      <section className={sectionClass}>
        <div className={innerClass}>{children}</div>
      </section>
    );
  }

  return (
    <m.section
      className={sectionClass}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      <div className={innerClass}>{children}</div>
    </m.section>
  );
}

export function MotionItem({ children, className = "" }) {
  const reduced = usePrefersReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <m.div variants={item} className={className}>
      {children}
    </m.div>
  );
}
