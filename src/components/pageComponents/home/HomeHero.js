"use client";

import { ArrowRight } from "lucide-react";
import StyledButton from "@/components/commonComponents/StyledButton";

export default function HomeHero({ hero, imageSrc = "/images/30722.webp" }) {
  return (
    <div className="bg-white p-4 md:p-8">
      <div
        className="relative mx-auto w-full rounded-4xl bg-black bg-cover bg-center"
        style={{ backgroundImage: `url(${imageSrc})` }}
      >
        <div className="rounded-4xl py-12 md:py-24 bg-gradient-to-r from-black/80 to-black/40 z-0">
          <div className="section-container z-10 flex flex-col items-start justify-start">
            <h1 className="capitalize text-white">
              Your reliable spice partner for professional kitchens
            </h1>
            <p className="mt-4 text-white/90">{hero.subtitle}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <StyledButton
                href={hero.ctaPrimary.href}
                variant="primary"
                size="md"
              >
                {hero.ctaPrimary.label}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </StyledButton>
              <StyledButton
                href={hero.ctaSecondary.href}
                variant="onDark"
                size="md"
              >
                {hero.ctaSecondary.label}
              </StyledButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
