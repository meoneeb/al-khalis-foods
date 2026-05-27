<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

<!-- BEGIN:brand-context -->

# Al-Khalis Foods — project context

- **Display name:** Al-Khalis Foods
- **Registered name:** Al-Khalis Prime Foods Pvt Ltd. Pakistan
- **About the brand:** A premium Pakistani spices brand.
- **Site scope:** This is **not** e-commerce for now. The site exists to **display products** and **brand presence** only (informational showcase).
<!-- END:brand-context -->

<!-- BEGIN:frontend-design-agent -->

# Frontend & Design Agent (Claude-first)

For UI, layout, motion, and visual polish on this project, prefer a **Frontend & Design** pass with **Claude** (`claude-opus-4-7-thinking-xhigh` or `claude-4.6-sonnet-medium-thinking`).

**Design rules**

- B2B food-service positioning — professional kitchens, hotels, catering, restaurants, marriage halls; bulk **1000g** packs; not e-commerce.
- Brand colors: `brand-brick`, `brand-spice`, `brand-saffron`, `brand-maroon`, `brand-herbal` in `src/app/globals.css`.
- Fonts: Manrope (body / `--font-sans`), Harper (display / `--font-display`, local files in `src/fonts/harper/`) via `layout.js`. Heading scale (`h1`–`h3`, weight 400) lives in `src/app/globals.css`.
- Stack: **framer-motion** (`LazyMotion` + `domAnimation`), **@headlessui/react** (mobile nav, filters), **lucide-react** (meaningful icons only).
- Keep App Router pages as **Server Components**; small `"use client"` islands for motion, filters, and nav.
- Static **dark theme** only — tokens in `globals.css` (near-black `brand-void`, charcoal surfaces `brand-elevated` / `brand-card`, `brand-cream` text). No `prefers-color-scheme` and no `dark:` utilities.
- Honor `prefers-reduced-motion` — no parallax or stagger when reduced motion is on.
- Product images: `/public/images/products/` (match real filenames, often `{id}.webp`); missing files use category placeholders in `/public/images/placeholders/`.
- Components: shared UI in `src/components/commonComponents/`; page-specific blocks in `src/components/pageComponents/` (`.js` only, not `.jsx`).
- Section layout: outer `<section className="w-full …bg/border">` + inner `<div className="sectionContainer py-8 md:py-12">` (`.sectionContainer` in `globals.css`: `max-w-7xl`, `px-4 md:px-8`). `MotionSection` applies this automatically.
<!-- END:frontend-design-agent -->
