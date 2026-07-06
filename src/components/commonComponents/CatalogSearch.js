"use client";

import { useMemo, useState, useRef, useEffect, useId } from "react";
import Link from "next/link";
import Fuse from "fuse.js";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ArrowRight, ChevronDown, Search } from "lucide-react";
import clsx from "clsx";
import { getAllProducts } from "@/lib/products";
import {
  CATALOG_SEARCH_TYPES,
  DEFAULT_FUSE_OPTIONS,
  getCatalogProducts,
} from "@/lib/catalog-search";
import StyledButton from "./StyledButton";

export default function CatalogSearch({
  className,
  theme = "light",
  inputId: inputIdProp,
  ariaLabel = "Search catalog",
  categories = CATALOG_SEARCH_TYPES,
  products: productsProp,
  defaultCategoryId,
  minQueryLength = 3,
  maxResults = 8,
  showCategoryFilter = true,
  submitLabel = "search",
  catalogHref = "/products",
  fuseOptions = DEFAULT_FUSE_OPTIONS,
  autoFocus = false,
  resultsInline = false,
  onResultSelect,
  onDismiss,
}) {
  const generatedId = useId();
  const inputId = inputIdProp ?? `catalog-search-${generatedId}`;

  const initialCategory =
    defaultCategoryId ?? categories[0]?.id ?? "bulk-spices";

  const [categoryId, setCategoryId] = useState(initialCategory);
  const [query, setQuery] = useState("");
  const [resultsOpen, setResultsOpen] = useState(false);
  const rootRef = useRef(null);
  const inputRef = useRef(null);

  const allProducts = productsProp ?? getAllProducts();
  const activeCategory =
    categories.find((c) => c.id === categoryId) ?? categories[0];

  const pool = useMemo(
    () =>
      showCategoryFilter
        ? getCatalogProducts(categoryId, allProducts)
        : allProducts,
    [allProducts, categoryId, showCategoryFilter],
  );

  const fuse = useMemo(
    () =>
      new Fuse(pool, {
        ...DEFAULT_FUSE_OPTIONS,
        ...fuseOptions,
        minMatchCharLength: minQueryLength,
      }),
    [pool, fuseOptions, minQueryLength],
  );

  const results = useMemo(() => {
    if (query.trim().length < minQueryLength) return [];
    return fuse
      .search(query.trim())
      .slice(0, maxResults)
      .map((r) => r.item);
  }, [fuse, query, minQueryLength, maxResults]);

  const showResults = resultsOpen && query.trim().length >= minQueryLength;

  const openResults = () => {
    if (query.trim().length >= minQueryLength) setResultsOpen(true);
  };

  const closeAndReset = () => {
    setResultsOpen(false);
    setQuery("");
  };

  const handleResultClick = (product) => {
    if (onResultSelect) {
      onResultSelect(product);
      return;
    }
    closeAndReset();
  };

  useEffect(() => {
    if (!autoFocus) return;
    let active = true;
    const frame = requestAnimationFrame(() => {
      if (active) inputRef.current?.focus();
    });
    return () => {
      active = false;
      cancelAnimationFrame(frame);
    };
  }, [autoFocus]);

  useEffect(() => {
    if (resultsInline) return;
    const onPointerDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setResultsOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [resultsInline]);

  const placeholder =
    activeCategory?.placeholder ??
    (activeCategory?.label
      ? `Search ${activeCategory.label.toLowerCase()}…`
      : "Search catalog…");

  const isDark = theme === "dark";

  return (
    <div ref={rootRef} className={clsx("relative w-full", className)}>
      <form
        className={clsx(
          "catalog-search-bar flex w-full items-stretch gap-1 rounded-3xl p-1.5 sm:gap-1.5",
          isDark
            ? "border border-white/12 bg-zinc-900/90 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-md"
            : "border border-zinc-200 bg-white shadow-md",
        )}
        onSubmit={(e) => {
          e.preventDefault();
          openResults();
        }}
      >
        <label className="sr-only" htmlFor={inputId}>
          {ariaLabel}
        </label>
        <input
          ref={inputRef}
          id={inputId}
          type="search"
          value={query}
          onChange={(e) => {
            const value = e.target.value;
            setQuery(value);
            setResultsOpen(value.trim().length >= minQueryLength);
          }}
          onFocus={() => {
            if (query.trim().length >= minQueryLength) setResultsOpen(true);
          }}
          placeholder={placeholder}
          autoComplete="off"
          className={clsx(
            "min-w-0 flex-1 bg-transparent px-4 py-2.5 text-left text-base outline-none sm:px-5 sm:py-3",
            isDark
              ? "text-zinc-50 placeholder:text-zinc-400"
              : "text-zinc-900 placeholder:text-zinc-500",
          )}
        />

        {showCategoryFilter && categories.length > 0 ? (
          <Listbox
            value={categoryId}
            onChange={(id) => {
              setCategoryId(id);
              setQuery("");
              setResultsOpen(false);
            }}
          >
            <div className="relative flex shrink-0 items-center">
              <ListboxButton
                className={clsx(
                  "flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition sm:px-5 sm:py-3",
                  isDark
                    ? "border-white/10 bg-zinc-950/95 text-zinc-50 hover:border-white/20 data-hover:bg-zinc-900"
                    : "border-zinc-200 bg-stone-100 text-zinc-900 hover:border-red-500/40 data-hover:bg-stone-200",
                )}
              >
                <span className="max-w-[7rem] truncate sm:max-w-none">
                  {activeCategory?.label}
                </span>
                <ChevronDown
                  className="h-4 w-4 shrink-0 text-zinc-500 [[data-open]_&]:rotate-180"
                  aria-hidden
                />
              </ListboxButton>
              <ListboxOptions
                anchor="bottom end"
                className="z-30 mt-2 min-w-[10rem] overflow-hidden rounded-xl border border-zinc-200 bg-white py-1 shadow-xl [--anchor-gap:6px]"
              >
                {categories.map((cat) => (
                  <ListboxOption
                    key={cat.id}
                    value={cat.id}
                    className="cursor-pointer px-4 py-2.5 text-sm text-zinc-900 data-focus:bg-stone-100 data-selected:font-medium data-selected:text-red-500"
                  >
                    {cat.label}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </div>
          </Listbox>
        ) : null}

        <StyledButton type="submit" size="sm">
          <Search className="h-4 w-4" aria-hidden />
          Search
        </StyledButton>
      </form>

      {showResults ? (
        <div
          className={clsx(
            "overflow-hidden rounded-2xl border text-left shadow-2xl",
            resultsInline ? "mt-4" : "absolute left-0 right-0 top-full z-20 mt-3",
            isDark
              ? "border-zinc-800 bg-zinc-900/95 backdrop-blur-xl"
              : "border-zinc-200 bg-white",
          )}
          role="listbox"
          aria-label="Search results"
        >
          {results.length > 0 ? (
            <ul className={clsx("overflow-y-auto py-1", resultsInline ? "max-h-80" : "max-h-72")}>
              {results.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/products/${product.id}`}
                    role="option"
                    onClick={() => handleResultClick(product)}
                    className={clsx(
                      "flex flex-col gap-0.5 px-4 py-3 transition",
                      isDark ? "hover:bg-zinc-950/80" : "hover:bg-stone-100",
                    )}
                  >
                    <span
                      className={clsx(
                        "font-medium",
                        isDark ? "text-zinc-50" : "text-zinc-900",
                      )}
                    >
                      {product.name}
                    </span>
                    <span
                      className={clsx(
                        "text-xs",
                        isDark ? "text-zinc-400" : "text-zinc-500",
                      )}
                    >
                      {product.categoryLabel} · {product.packSize}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-6 text-center text-sm text-zinc-500">
              No products match &ldquo;{query.trim()}&rdquo;
            </p>
          )}
          {catalogHref ? (
            <div className="border-t border-zinc-200/50 px-4 py-2.5 text-center">
              <Link
                href={catalogHref}
                className="text-sm font-medium text-red-500 hover:text-red-500"
                onClick={() => {
                  if (onDismiss) {
                    onDismiss();
                    return;
                  }
                  setResultsOpen(false);
                }}
              >
                Browse full catalog
              </Link>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
