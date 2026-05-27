"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import site from "@/data/site.json";
import MobileNav, { MenuButton } from "@/components/commonComponents/MobileNav";
import { ProductsNavItem } from "@/components/commonComponents/ProductsMegaMenu";
import StyledButton from "./StyledButton";

function isNavActive(pathname, href) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

function NavLink({ href, label, active }) {
  return (
    <Link
      href={href}
      className={clsx(
        "flex h-full items-center border-b-2 px-4 text-sm font-medium transition sm:px-5",
        active
          ? "border-brand-saffron bg-brand-saffron/10 text-brand-cream"
          : "border-transparent text-brand-muted hover:bg-white/5 hover:text-brand-cream",
      )}
    >
      {label}
    </Link>
  );
}

function ContactButton({ className }) {
  const { contact } = site;
  return (
    <a
      href={contact.href}
      className={clsx(
        "flex h-full shrink-0 items-center border-b-2 border-l border-white/10 border-b-transparent bg-amber-500 px-4 text-sm font-semibold text-brand-cream transition hover:bg-amber-600 sm:px-5 max-lg:rounded-none lg:rounded-r-2xl",
        className,
      )}
    >
      {contact.label}
    </a>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="pointer-events-none sticky top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4 lg:px-6">
        <header
          className={clsx(
            "pointer-events-auto mx-auto max-w-7xl overflow-visible rounded-2xl border shadow-[0_8px_32px_rgba(0,0,0,0.4)] ring-1 ring-inset backdrop-blur-xl backdrop-saturate-150 transition-[background-color,border-color,box-shadow] duration-300",
            scrolled
              ? "border-white/15 bg-brand-void/70 shadow-[0_12px_40px_rgba(0,0,0,0.5)] ring-white/10"
              : "border-white/10 bg-brand-void/35 ring-white/5",
          )}
        >
          <div className="sectionContainer grid min-h-14 grid-cols-[1fr_auto_1fr] items-stretch sm:min-h-16">
            <div className="flex min-w-0 items-stretch justify-start">
              <Link
                href="/"
                className="flex min-w-0 flex-col justify-center px-3 leading-tight sm:px-4"
              >
                <span className="truncate font-display text-base font-normal tracking-tight text-brand-cream transition-colors hover:text-brand-saffron sm:text-lg">
                  {site.brand.displayName}
                </span>
                <span className="hidden truncate text-[10px] font-medium uppercase tracking-[0.2em] text-brand-muted md:block md:text-[11px]">
                  {site.brand.productLine}
                </span>
              </Link>
            </div>

            <nav
              className="hidden items-stretch justify-center lg:flex"
              aria-label="Primary"
            >
              {site.nav.map((item) => {
                const active = isNavActive(pathname, item.href);

                if (item.megaMenu === "products") {
                  return <ProductsNavItem key={item.href} active={active} />;
                }

                return (
                  <NavLink
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    active={active}
                  />
                );
              })}
            </nav>

            <div className="flex items-center justify-end">
              <MenuButton
                onClick={() => setMobileOpen(true)}
                className="rounded-r-2xl border-l border-white/10 lg:hidden"
              />
            </div>
          </div>
        </header>
      </div>
      <MobileNav
        nav={site.nav}
        contact={site.contact}
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </>
  );
}
