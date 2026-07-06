"use client";

import { ArrowRight } from "lucide-react";
import StyledButton from "@/components/commonComponents/StyledButton";

export default function HomeHero({ hero }) {
  return (
    <div className="bg-white py-8">
      <div className="relative section-container bg-black rounded-4xl bg-[url('/images/hero-image-1.webp')] bg-cover bg-center">
        <div className="inset-0 rounded-4xl py-24">
          <div className="flex flex-col items-start justify-start  max-w-3xl  z-10">
            <h1 className=" text-white capitalize">
              Your reliable spice partner for professional kitchens
            </h1>
            <p className=" text-white/90 mt-4">{hero.subtitle}</p>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <StyledButton href={hero.ctaPrimary.href} variant="primary">
                {hero.ctaPrimary.label}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </StyledButton>
              <StyledButton href={hero.ctaSecondary.href} variant="onDark">
                {hero.ctaSecondary.label}
              </StyledButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
