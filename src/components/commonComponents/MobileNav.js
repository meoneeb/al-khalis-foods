"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import StyledButton from "@/components/commonComponents/StyledButton";
import { ProductsMobileNav } from "@/components/commonComponents/ProductsMegaMenu";
import {
  isNavActive,
  mobileNavLinkClass,
} from "@/lib/nav-styles";

export default function MobileNav({ nav, contact, open, onClose }) {
  const pathname = usePathname();

  return (
    <Dialog open={open} onClose={onClose} className="relative z-[60] lg:hidden">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        aria-hidden="true"
      />
      <DialogPanel className="fixed inset-y-0 right-0 flex w-full max-w-sm flex-col border-l border-border bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-border px-4 py-4">
          <DialogTitle className="font-display text-lg font-normal text-zinc-900">
            Menu
          </DialogTitle>
          <button
            type="button"
            onClick={onClose}
            className="icon-btn icon-btn-round"
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
                className={mobileNavLinkClass(active)}
              >
                {item.label}
              </Link>
            );
          })}
          {contact ? (
            <StyledButton
              href={contact.href}
              size="md"
              className="mt-2 w-full"
              onClick={onClose}
            >
              {contact.label}
            </StyledButton>
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
      className={clsx("icon-btn icon-btn-sm", className)}
      aria-label="Open menu"
    >
      <Menu className="h-5 w-5" />
    </button>
  );
}
