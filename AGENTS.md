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
- Use **Tailwind default palette** mapped through semantic tokens in `globals.css` (`brand`, `muted`, `border`, `surface-stone`, etc.). **Red** is the primary accent; neutrals use `zinc` and `stone`.
- Fonts: Manrope (body / `--font-sans`), Harper (display / `--font-display`, local files in `src/fonts/harper/`) via `layout.js`. Heading scale (`h1`–`h3`, weight 400) lives in `src/app/globals.css`.
- **Design system primitives** in `commonComponents/`: `Eyebrow`, `Card`, `Chip`, `StyledButton`, `MotionSection`, `PageHero`. Shared motion tokens in `src/lib/motion.js`. CSS utilities in `globals.css` (`eyebrow`, `prose-muted`, `card`, `chip`, `grid-split`, `grid-cards`, `btn-*`).
- Stack: **framer-motion** (`LazyMotion` + `domAnimation`), **@headlessui/react** (mobile nav, filters), **lucide-react** (meaningful icons only).
- Keep App Router route files in `src/app/` thin — routing, metadata, and data fetching only. Page UI lives in `*Screen.js` under `src/components/pageComponents/<page>/`.
- **Light default theme** — white background, dark ink text; dark image heroes and alternating section tones (`light` / `stone` / `dark` via `MotionSection`). Tokens in `src/app/globals.css`. Honors `prefers-reduced-motion`.
- Honor `prefers-reduced-motion` — no parallax or stagger when reduced motion is on.
- Product images: `/public/images/products/` (match real filenames, often `{id}.webp`); missing files use category placeholders in `/public/images/placeholders/`.
- **Component layout:**
  - `src/app/` — routes, `layout.js`, `globals.css` only
  - `src/components/commonComponents/` — reusable site UI (`SiteHeader`, `StyledButton`, `Eyebrow`, `Card`, `Chip`, `MotionSection`, `PageHero`, `CatalogSearch`, etc.)
  - `src/components/pageComponents/<page>/` — page folder with `<page>Screen.js` entry (e.g. `home/homeScreen.js`, `products/productsScreen.js`, `products/productDetailScreen.js`)
- Catalog search: reusable `CatalogSearch` + `SearchModal` in `commonComponents`. Defaults in `src/lib/catalog-search.js`.
- Section layout: outer `<section className="w-full …bg/border">` + inner `<div className="section-container section-inner">` (`.section-container` in `globals.css`: `max-w-7xl`, `px-4 md:px-8`). `MotionSection` applies this automatically.
<!-- END:frontend-design-agent -->
