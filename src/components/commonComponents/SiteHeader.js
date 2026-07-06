"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";
import site from "@/data/site.json";
import MobileNav, { MenuButton } from "@/components/commonComponents/MobileNav";
import { ProductsNavItem } from "@/components/commonComponents/ProductsMegaMenu";
import SearchModal from "./SearchModal";
import StyledButton from "./StyledButton";

function isNavActive(pathname, href) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

function NavLink({ href, label, active }) {
  return (
    <Link
      href={href}
      className={clsx(
        "flex items-center px-4 text-xs transition sm:px-5",
        active
          ? "font-bold text-red-500"
          : "font-medium text-zinc-500 hover:text-zinc-900",
      )}
    >
      {label}
    </Link>
  );
}

function ContactButton({ className }) {
  const { contact } = site;
  return (
    <StyledButton href={contact.href} variant="primary" size="md">
      {contact.label}
    </StyledButton>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <div className="pointer-events-none  z-50 px-3 sm:px-5 lg:px-6">
        <header
          className={clsx(
            "pointer-events-auto mx-auto max-w-7xl overflow-visible",
          )}
        >
          <div className="section-container grid min-h-14 grid-cols-[1fr_auto_1fr] items-stretch sm:min-h-16">
            <div className="flex min-w-0 items-stretch justify-start">
              <Link
                href="/"
                className="flex min-w-0 flex-col justify-center px-3 leading-tight sm:px-4"
              >
                <span className="truncate font-display text-base font-normal tracking-tight text-zinc-900 transition-colors hover:text-red-600 sm:text-lg">
                  {site.brand.displayName}
                </span>
                <span className="hidden truncate text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500 md:block md:text-[11px]">
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

            <div className="flex items-center justify-end gap-1 sm:gap-2">
              <SearchModal />
              <ContactButton className="hidden lg:flex" />
              <MenuButton
                onClick={() => setMobileOpen(true)}
                className="rounded-r-2xl border-l border-zinc-200 lg:hidden"
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
