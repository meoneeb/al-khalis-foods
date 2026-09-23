"use client";

import { m } from "framer-motion";
import { getAudienceIcon } from "@/lib/audience-icons";
import Chip from "@/components/commonComponents/Chip";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { chipMotion } from "@/lib/motion";

export default function AudienceChips({ audiences }) {
  const reduced = usePrefersReducedMotion();

  return (
    <ul className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-4">
      {audiences.map((a, i) => {
        const Icon = getAudienceIcon(a.icon);
        const chip = <Chip icon={Icon}>{a.label}</Chip>;

        if (reduced) {
          return (
            <li key={a.label} className="list-none">
              {chip}
            </li>
          );
        }

        return (
          <m.li
            key={a.label}
            className="list-none"
            {...chipMotion(i)}
          >
            {chip}
          </m.li>
        );
      })}
    </ul>
  );
}
