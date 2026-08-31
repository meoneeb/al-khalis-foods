"use client";

import { m } from "framer-motion";
import clsx from "clsx";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { sectionMotion } from "@/lib/motion";

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
  const sectionClass = clsx(
    "w-full",
    TONE_CLASS[tone] ?? TONE_CLASS.light,
    className,
  );
  const innerClass = clsx("section-container section-inner", containerClassName);

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
      variants={sectionMotion.container}
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
    <m.div variants={sectionMotion.item} className={className}>
      {children}
    </m.div>
  );
}
