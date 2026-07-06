"use client";

import { ArrowRight } from "lucide-react";
import StyledButton from "@/components/commonComponents/StyledButton";
import PageHero from "@/components/commonComponents/PageHero";
import HeroMotion, {
  HeroMotionItem,
} from "@/components/commonComponents/HeroMotion";
import CatalogSearch from "@/components/commonComponents/CatalogSearch";

export default function HomeHero({ hero, imageSrc = "/images/30722.webp" }) {
  return (
    <PageHero
      image={imageSrc}
      align="center"
      size="tall"
      priority
      scrim="default"
    >
      <HeroMotion className="hero-content-shadow flex w-full max-w-3xl flex-col items-center">
        <HeroMotionItem>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-red-500">
            {hero.eyebrow}
          </p>
        </HeroMotionItem>
        <HeroMotionItem>
          <h1 className="hero-heading mt-4 capitalize">
            Your <span className="gradient-text">reliable spice partner</span>{" "}
            for professional kitchens
          </h1>
        </HeroMotionItem>
        <HeroMotionItem>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-50/95 sm:text-lg">
            {hero.subtitle}
          </p>
        </HeroMotionItem>
        <HeroMotionItem className="w-full">
          <CatalogSearch className="mx-auto mt-10 max-w-2xl" theme="dark" />
        </HeroMotionItem>
        <HeroMotionItem>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <StyledButton href={hero.ctaPrimary.href} variant="primary">
              {hero.ctaPrimary.label}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </StyledButton>
            <StyledButton href={hero.ctaSecondary.href} variant="onDark">
              {hero.ctaSecondary.label}
            </StyledButton>
          </div>
        </HeroMotionItem>
      </HeroMotion>
    </PageHero>
  );
}
