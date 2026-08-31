"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import site from "@/data/site.json";
import MobileNav, { MenuButton } from "@/components/commonComponents/MobileNav";
import { ProductsNavItem } from "@/components/commonComponents/ProductsMegaMenu";
import SearchModal from "./SearchModal";
import StyledButton from "./StyledButton";
import { desktopNavLinkClass, isNavActive } from "@/lib/nav-styles";

function NavLink({ href, label, active }) {
  return (
    <Link href={href} className={desktopNavLinkClass(active)}>
      {label}
    </Link>
  );
}

function ContactButton({ className }) {
  const { contact } = site;
  return (
    <StyledButton
      href={contact.href}
      variant="primary"
      size="md"
      className={className}
    >
      {contact.label}
    </StyledButton>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex h-14 items-center justify-between gap-3 sm:h-16 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-stretch lg:gap-0">
            <div className="flex min-w-0 items-center lg:items-stretch">
              <Link
                href="/"
                className="flex min-w-0 flex-col justify-center leading-tight lg:px-4"
              >
                <span className="font-display text-[15px] font-normal tracking-tight text-zinc-900 transition-colors hover:text-brand-hover sm:text-lg">
                  <span className="lg:hidden">Al-Khalis Prime</span>
                  <span className="hidden lg:inline">{site.brand.displayName}</span>
                </span>
                <span className="hidden truncate text-[10px] font-medium uppercase tracking-[0.2em] text-muted md:block md:text-[11px]">
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

            <div className="flex shrink-0 items-center justify-end gap-0.5 sm:gap-1">
              <SearchModal />
              <ContactButton className="hidden lg:flex" />
              <MenuButton
                onClick={() => setMobileOpen(true)}
                className="lg:hidden"
              />
            </div>
          </div>
        </div>
      </header>
      <MobileNav
        nav={site.nav}
        contact={site.contact}
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </>
  );
}
