"use client";

import { m } from "framer-motion";
import { getAudienceIcon } from "@/lib/audience-icons";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

export default function AudienceChips({ audiences }) {
  const reduced = usePrefersReducedMotion();

  return (
    <ul className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4">
      {audiences.map((a, i) => {
        const Icon = getAudienceIcon(a.icon);
        const content = (
          <li
            key={a.label}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-stone-100 px-4 py-2.5 text-sm font-medium text-zinc-900 shadow-sm"
          >
            <Icon className="h-4 w-4 text-red-500" aria-hidden />
            {a.label}
          </li>
        );
        if (reduced) return content;
        return (
          <m.li
            key={a.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.35 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200/60 bg-white px-4 py-2.5 text-sm font-medium text-zinc-900 shadow-sm">
              <Icon className="h-4 w-4 text-red-500" aria-hidden />
              {a.label}
            </span>
          </m.li>
        );
      })}
    </ul>
  );
}
