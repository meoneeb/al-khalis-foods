"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import StyledButton from "@/components/commonComponents/StyledButton";
import { m, useScroll, useTransform } from "framer-motion";
import HeroMotion, {
  HeroMotionItem,
} from "@/components/commonComponents/HeroMotion";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

const imagePositionClass =
  "pointer-events-none absolute right-[8%] top-[8%] z-0 h-[min(72vh,640px)] w-[min(88vw,720px)] max-lg:left-1/2 max-lg:right-auto max-lg:top-auto max-lg:bottom-0 max-lg:h-[min(50vh,420px)] max-lg:w-[min(100%,520px)] max-lg:-translate-x-1/2";

export default function HomeHero({
  hero,
  imageSrc = "/images/ginger-powder.webp",
  imageAlt = "Al-Khalis Prime commercial spices",
}) {
  const sectionRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const imageX = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const imageOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.9, 0.55, 0.2],
  );
  const imageRotate = useTransform(scrollYProgress, [0, 1], [0, 4]);

  const imageContent = (
    <div className="relative h-full w-full">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        sizes="(max-width: 1024px) 80vw, 55vw"
        className="object-contain object-right-bottom drop-shadow-[0_24px_80px_rgba(0,0,0,0.45)] max-lg:object-bottom"
      />
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[85vh] overflow-hidden border-b border-brand-line/50 sm:min-h-[90vh]"
    >
      <div className="absolute inset-0 z-0" aria-hidden>
        {reduced ? (
          <div className={imagePositionClass}>{imageContent}</div>
        ) : (
          <m.div
            style={{
              y: imageY,
              x: imageX,
              scale: imageScale,
              opacity: imageOpacity,
              rotate: imageRotate,
            }}
            className={`${imagePositionClass} will-change-transform`}
          >
            {imageContent}
          </m.div>
        )}

        {/* <div className="absolute inset-0 bg-gradient-to-r from-brand-void from-45% via-brand-void/75 via-65% to-brand-void/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-void via-brand-void/40 to-transparent lg:hidden" /> */}
      </div>

      <div className="sectionContainer relative z-10 pb-20 pt-16 sm:pb-28 sm:pt-20 lg:pt-24">
        <HeroMotion>
          <HeroMotionItem>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-spice">
              {hero.eyebrow}
            </p>
          </HeroMotionItem>
          <HeroMotionItem>
            <h1 className="mt-4 max-w-3xl capitalize ">
              Your <span className="gradient-text">reliable spice partner</span>{" "}
              for professional kitchens
            </h1>
          </HeroMotionItem>
          <HeroMotionItem>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-brand-muted sm:text-lg">
              {hero.subtitle}
            </p>
          </HeroMotionItem>
          <HeroMotionItem>
            <div className="mt-10 flex flex-wrap gap-3">
              <StyledButton href={hero.ctaPrimary.href} variant="primary">
                {hero.ctaPrimary.label}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </StyledButton>
              <StyledButton href={hero.ctaSecondary.href} variant="secondary">
                {hero.ctaSecondary.label}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </StyledButton>
            </div>
          </HeroMotionItem>
        </HeroMotion>
      </div>
    </section>
  );
}
