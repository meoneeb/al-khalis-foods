"use client";

import Link from "next/link";
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
    <div className="rounded-2xl border border-brand-line/80 bg-brand-card/98 backdrop-blur-3xl p-5 shadow-2xl shadow-black/40 sm:p-6">
      <div className="grid gap-8 md:grid-cols-3">
        {columns.map((col) => (
          <div key={col.id} className="min-w-0">
            <Link href="/products" onClick={onNavigate} className="group block">
              <h3 className="text-base text-brand-cream transition group-hover:text-brand-saffron">
                {col.label}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-brand-muted">
                {col.description}
              </p>
              <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-brand-spice">
                {col.total} products
                <ArrowRight
                  className="h-3 w-3 transition group-hover:translate-x-0.5"
                  aria-hidden
                />
              </span>
            </Link>
            <ul className="mt-4 space-y-0.5 border-t border-brand-line/50 pt-4">
              {col.products.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/products/${p.id}`}
                    onClick={onNavigate}
                    className="block truncate rounded-lg px-2 py-1.5 text-sm text-brand-muted transition hover:bg-brand-sand/60 hover:text-brand-cream"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-brand-line/50 pt-5">
        <p className="text-xs text-brand-muted">
          {total} SKUs · 1000g bulk packs · display catalog only
        </p>
        <Link
          href="/products"
          onClick={onNavigate}
          className="inline-flex items-center gap-2 rounded-xl border border-amber-400 bg-amber-500 px-5 py-2.5 text-sm font-semibold text-brand-cream shadow-xl shadow-amber-500/35 transition hover:border-amber-600 hover:bg-amber-600"
        >
          View full catalog
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </div>
  );
}

export function ProductsNavItem({ active }) {
  return (
    <Popover className="relative flex h-full">
      <PopoverButton
        className={clsx(
          "flex h-full items-center gap-1.5 border-b-2 px-4 text-sm font-medium transition outline-none sm:px-5",
          active
            ? "border-brand-saffron bg-brand-saffron/10 text-brand-cream"
            : "border-transparent text-brand-muted hover:bg-white/5 hover:text-brand-cream data-hover:border-brand-saffron/40 data-hover:text-brand-cream",
        )}
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
    <Disclosure as="div" className="rounded-xl border border-brand-line/50">
      <DisclosureButton
        className={clsx(
          "flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-base font-medium transition",
          active
            ? "bg-brand-saffron/15 text-brand-cream"
            : "text-brand-cream hover:bg-brand-sand",
        )}
      >
        Products
        <ChevronDown
          className="h-5 w-5 [[data-open]_&]:rotate-180"
          aria-hidden
        />
      </DisclosureButton>
      <DisclosurePanel className="border-t border-brand-line/50 px-3 pb-3 pt-2">
        <Link
          href="/products"
          onClick={onClose}
          className="mb-3 flex items-center justify-between rounded-lg bg-brand-saffron px-4 py-2.5 text-sm font-semibold text-brand-void"
        >
          View all {total} products
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
        {columns.map((col) => (
          <div key={col.id} className="mb-4 last:mb-0">
            <Link
              href="/products"
              onClick={onClose}
              className="block px-2 py-1 text-sm font-semibold text-brand-spice"
            >
              {col.label}
              <span className="ml-2 font-normal text-brand-muted">
                ({col.total})
              </span>
            </Link>
            <ul className="mt-1 space-y-0.5">
              {col.products.slice(0, 4).map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/products/${p.id}`}
                    onClick={onClose}
                    className="block rounded-lg px-2 py-2 text-sm text-brand-muted hover:bg-brand-sand hover:text-brand-cream"
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
