"use client";

import { ArrowRight } from "lucide-react";
import StyledButton from "@/components/commonComponents/StyledButton";

export default function HomeHero({ hero, imageSrc = "/images/30722.webp" }) {
  return (
    <div className="bg-white py-8">
      <div
        className="relative section-container rounded-4xl bg-black bg-cover bg-center"
        style={{ backgroundImage: `url(${imageSrc})` }}
      >
        <div className="rounded-4xl py-24">
          <div className="z-10 flex max-w-3xl flex-col items-start justify-start">
            <h1 className="capitalize text-white">
              Your reliable spice partner for professional kitchens
            </h1>
            <p className="mt-4 text-white/90">{hero.subtitle}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <StyledButton href={hero.ctaPrimary.href} variant="primary" size="md">
                {hero.ctaPrimary.label}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </StyledButton>
              <StyledButton href={hero.ctaSecondary.href} variant="onDark" size="md">
                {hero.ctaSecondary.label}
              </StyledButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
