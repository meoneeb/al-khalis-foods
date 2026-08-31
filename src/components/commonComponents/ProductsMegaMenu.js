"use client";

import Link from "next/link";
import StyledButton from "@/components/commonComponents/StyledButton";
import Card from "@/components/commonComponents/Card";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDown, ArrowRight } from "lucide-react";
import clsx from "clsx";
import {
  getAllProducts,
  getCategories,
  getProductsByCategory,
} from "@/lib/products";
import {
  desktopNavLinkClass,
  mobileNavTriggerClass,
} from "@/lib/nav-styles";

const PRODUCTS_PER_CATEGORY = 6;

function useMegaMenuData() {
  const categories = getCategories();
  const total = getAllProducts().length;
  const columns = categories.map((cat) => ({
    ...cat,
    products: getProductsByCategory(cat.id, PRODUCTS_PER_CATEGORY),
    total: getProductsByCategory(cat.id).length,
  }));
  return { columns, total };
}

function MegaMenuPanel({ onNavigate }) {
  const { columns, total } = useMegaMenuData();

  return (
    <Card variant="panel">
      <div className="grid gap-8 md:grid-cols-3">
        {columns.map((col) => (
          <div key={col.id} className="min-w-0">
            <Link href="/products" onClick={onNavigate} className="group block">
              <h3 className="text-base text-zinc-900 transition group-hover:text-brand-hover">
                {col.label}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                {col.description}
              </p>
              <span className="link-accent mt-2 inline-flex items-center gap-1 text-xs">
                {col.total} products
                <ArrowRight
                  className="h-3 w-3 transition group-hover:translate-x-0.5"
                  aria-hidden
                />
              </span>
            </Link>
            <ul className="mt-4 space-y-0.5 border-t border-border pt-4">
              {col.products.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/products/${p.id}`}
                    onClick={onNavigate}
                    className="block truncate rounded-lg px-2 py-1.5 text-sm text-muted transition hover:bg-surface-stone hover:text-zinc-900"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
        <p className="text-xs text-muted">
          {total} SKUs · 1000g bulk packs · display catalog only
        </p>
        <StyledButton href="/products" size="md" onClick={onNavigate}>
          View full catalog
          <ArrowRight className="h-4 w-4" aria-hidden />
        </StyledButton>
      </div>
    </Card>
  );
}

export function ProductsNavItem({ active }) {
  return (
    <Popover className="relative flex h-full">
      <PopoverButton
        className={clsx(desktopNavLinkClass(active), "gap-1.5 outline-none")}
      >
        Products
        <ChevronDown
          className="h-4 w-4 shrink-0 opacity-70 transition [[data-open]_&]:rotate-180"
          aria-hidden
        />
      </PopoverButton>
      <PopoverPanel
        transition
        className="fixed inset-x-0 top-[calc(3.5rem+0.75rem)] z-50 flex justify-center px-4 pt-2 transition duration-200 ease-out data-closed:translate-y-1 data-closed:opacity-0 sm:top-[calc(4rem+1rem)] sm:px-6 md:px-8"
      >
        <div className="w-full max-w-7xl">
          <MegaMenuPanel />
        </div>
      </PopoverPanel>
    </Popover>
  );
}

export function ProductsMobileNav({ pathname, onClose }) {
  const { columns, total } = useMegaMenuData();
  const active = pathname.startsWith("/products");

  return (
    <Disclosure as="div" className="rounded-xl border border-border">
      <DisclosureButton className={mobileNavTriggerClass(active)}>
        Products
        <ChevronDown
          className="h-5 w-5 [[data-open]_&]:rotate-180"
          aria-hidden
        />
      </DisclosureButton>
      <DisclosurePanel className="border-t border-border px-3 pb-3 pt-2">
        <StyledButton
          href="/products"
          size="md"
          className="mb-3 w-full"
          onClick={onClose}
        >
          View all {total} products
          <ArrowRight className="h-4 w-4" aria-hidden />
        </StyledButton>
        {columns.map((col) => (
          <div key={col.id} className="mb-4 last:mb-0">
            <Link
              href="/products"
              onClick={onClose}
              className="block px-2 py-1 text-sm font-semibold text-brand"
            >
              {col.label}
              <span className="ml-2 font-normal text-muted">({col.total})</span>
            </Link>
            <ul className="mt-1 space-y-0.5">
              {col.products.slice(0, 4).map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/products/${p.id}`}
                    onClick={onClose}
                    className="block rounded-lg px-2 py-2 text-sm text-muted hover:bg-surface-stone hover:text-zinc-900"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </DisclosurePanel>
    </Disclosure>
  );
}
