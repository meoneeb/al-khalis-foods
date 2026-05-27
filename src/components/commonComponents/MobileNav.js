"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import { ProductsMobileNav } from "@/components/commonComponents/ProductsMegaMenu";

function isNavActive(pathname, href) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export default function MobileNav({ nav, contact, open, onClose }) {
  const pathname = usePathname();

  return (
    <Dialog open={open} onClose={onClose} className="relative z-[60] lg:hidden">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        aria-hidden="true"
      />
      <DialogPanel className="fixed inset-y-0 right-0 flex w-full max-w-sm flex-col border-l border-brand-line bg-brand-card shadow-xl">
        <div className="flex items-center justify-between border-b border-brand-line px-4 py-4">
          <DialogTitle className="font-display text-lg font-normal text-brand-cream">
            Menu
          </DialogTitle>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-brand-muted hover:bg-brand-sand hover:text-brand-cream"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav
          className="flex flex-1 flex-col gap-1 overflow-y-auto p-4"
          aria-label="Mobile"
        >
          {nav.map((item) => {
            if (item.megaMenu === "products") {
              return (
                <ProductsMobileNav
                  key={item.href}
                  pathname={pathname}
                  onClose={onClose}
                />
              );
            }

            const active = isNavActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={clsx(
                  "rounded-xl px-4 py-3.5 text-base font-medium transition",
                  active
                    ? "bg-brand-saffron text-brand-void"
                    : "text-brand-cream hover:bg-brand-sand",
                )}
              >
                {item.label}
              </Link>
            );
          })}
          {contact ? (
            <a
              href={contact.href}
              onClick={onClose}
              className="mt-2 flex items-center justify-center rounded-xl border border-amber-400 bg-amber-500 px-4 py-3.5 text-base font-semibold text-brand-cream shadow-xl shadow-amber-500/35 transition hover:border-amber-600 hover:bg-amber-600"
            >
              {contact.label}
            </a>
          ) : null}
        </nav>
      </DialogPanel>
    </Dialog>
  );
}

export function MenuButton({ onClick, className }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "flex h-full min-w-11 items-center justify-center px-2 text-brand-cream hover:bg-brand-sand sm:min-w-12",
        className,
      )}
      aria-label="Open menu"
    >
      <Menu className="h-6 w-6" />
    </button>
  );
}
