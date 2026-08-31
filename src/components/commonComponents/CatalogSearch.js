"use client";

import { useMemo, useState, useRef, useEffect, useId } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Tab,
  TabGroup,
  TabList,
} from "@headlessui/react";
import { Search } from "lucide-react";
import clsx from "clsx";
import { getAllProducts } from "@/lib/products";
import { DEFAULT_FUSE_OPTIONS } from "@/lib/catalog-search";
import {
  CATALOG_TYPE_FILTERS,
  buildProductsSearchHref,
  normalizeTypeParam,
  typeParamToCategoryId,
} from "@/lib/catalog-query";
import ProductImage from "@/components/pageComponents/products/ProductImage";
import StyledButton from "./StyledButton";

export default function CatalogSearch({
  className,
  theme = "light",
  inputId: inputIdProp,
  ariaLabel = "Search catalog",
  products: productsProp,
  minQueryLength = 3,
  maxResults = 8,
  placeholder = "Search products…",
  fuseOptions = DEFAULT_FUSE_OPTIONS,
  autoFocus = false,
  resultsInline = false,
  onResultSelect,
  onDismiss,
  initialQuery = "",
  initialType = "all",
  showTypeFilter = false,
  submitBehavior = "dropdown",
}) {
  const router = useRouter();
  const generatedId = useId();
  const inputId = inputIdProp ?? `catalog-search-${generatedId}`;

  const [query, setQuery] = useState(initialQuery);
  const [type, setType] = useState(() => normalizeTypeParam(initialType));
  const inputRef = useRef(null);

  const allProducts = productsProp ?? getAllProducts();
  const redirectOnSubmit = submitBehavior === "redirect";

  const pool = useMemo(() => {
    const categoryId = typeParamToCategoryId(type);
    return categoryId
      ? allProducts.filter((p) => p.category === categoryId)
      : allProducts;
  }, [allProducts, type]);

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

  const canShowOptions =
    query.trim().length >= minQueryLength &&
    (!redirectOnSubmit || !showTypeFilter);

  const typeIndex = Math.max(
    0,
    CATALOG_TYPE_FILTERS.findIndex((f) => f.param === type),
  );

  const navigateToResults = (searchQuery = query, searchType = type) => {
    const href = buildProductsSearchHref({ k: searchQuery, type: searchType });
    router.push(href);
    onDismiss?.();
  };

  const handleTypeSelect = (nextType) => {
    setType(nextType);
    if (redirectOnSubmit) {
      navigateToResults(query, nextType);
    }
  };

  const handleProductSelect = (product) => {
    if (!product) return;
    if (onResultSelect) {
      onResultSelect(product);
      return;
    }
    router.push(`/products/${product.id}`);
    setQuery("");
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

  const isDark = theme === "dark";
  const catalogHref = buildProductsSearchHref({ k: query, type });

  const optionsPanelClass = clsx(
    "overflow-hidden rounded-2xl border text-left shadow-2xl outline-none",
    resultsInline ? "relative mt-4 w-full" : "z-20 w-[var(--input-width)]",
    isDark
      ? "border-border-dark bg-zinc-900/95 backdrop-blur-xl"
      : "border-border bg-white",
  );

  return (
    <Combobox
      as="div"
      nullable
      value={null}
      onChange={handleProductSelect}
      className={clsx("relative w-full", className)}
    >
      <form
        className={clsx(
          "catalog-search-bar flex w-full items-stretch gap-1 rounded-2xl p-1.5 sm:gap-1.5",
          isDark
            ? "border border-white/12 bg-zinc-900/90 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-md"
            : "border border-border bg-white shadow-md",
        )}
        onSubmit={(e) => {
          e.preventDefault();
          if (redirectOnSubmit) {
            navigateToResults();
          }
        }}
      >
        <label className="sr-only" htmlFor={inputId}>
          {ariaLabel}
        </label>
        <ComboboxInput
          ref={inputRef}
          id={inputId}
          autoFocus={autoFocus}
          displayValue={() => query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          autoComplete="off"
          className={clsx(
            "min-w-0 flex-1 bg-transparent px-4 py-2.5 text-left text-sm outline-none sm:px-5 sm:py-3",
            isDark
              ? "text-zinc-50 placeholder:text-zinc-400"
              : "text-zinc-900 placeholder:text-muted",
          )}
        />

        <StyledButton type="submit" size="sm">
          <Search className="h-4 w-4" aria-hidden />
          <span className="sr-only md:not-sr-only">Search</span>
        </StyledButton>
      </form>

      {showTypeFilter ? (
        <TabGroup
          selectedIndex={typeIndex}
          onChange={(index) =>
            handleTypeSelect(CATALOG_TYPE_FILTERS[index].param)
          }
        >
          <TabList
            className="mt-4 flex flex-wrap justify-center gap-2"
            aria-label="Filter by product type"
          >
            {CATALOG_TYPE_FILTERS.map((opt) => (
              <Tab key={opt.param} className="chip-tab">
                {opt.label}
              </Tab>
            ))}
          </TabList>
        </TabGroup>
      ) : null}

      {canShowOptions ? (
        <ComboboxOptions
          anchor={resultsInline ? undefined : "bottom start"}
          className={optionsPanelClass}
          modal={false}
        >
          {results.length > 0 ? (
            <ul
              className={clsx(
                "overflow-y-auto py-1",
                resultsInline ? "max-h-80" : "max-h-72",
              )}
            >
              {results.map((product) => (
                <ComboboxOption
                  key={product.id}
                  value={product}
                  className={clsx(
                    "flex cursor-pointer items-center gap-3 px-3 py-2.5 transition sm:px-4",
                    isDark
                      ? "data-focus:bg-zinc-950/80"
                      : "data-focus:bg-surface-stone",
                  )}
                >
                  <ProductImage
                    src={product.image}
                    alt=""
                    category={product.category}
                    variant="thumb"
                  />
                  <div className="min-w-0 flex-1">
                    <span
                      className={clsx(
                        "block truncate font-medium",
                        isDark ? "text-zinc-50" : "text-zinc-900",
                      )}
                    >
                      {product.name}
                    </span>
                    <span
                      className={clsx(
                        "block truncate text-xs",
                        isDark ? "text-muted-dark" : "text-muted",
                      )}
                    >
                      {product.categoryLabel} · {product.packSize}
                    </span>
                  </div>
                </ComboboxOption>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-6 text-center text-sm text-muted">
              No products match &ldquo;{query.trim()}&rdquo;
            </p>
          )}
          <div className="border-t border-border/50 px-4 py-2.5 text-center">
            <Link
              href={catalogHref}
              className="link-accent text-sm"
              onClick={() => onDismiss?.()}
            >
              View all matching results
            </Link>
          </div>
        </ComboboxOptions>
      ) : null}
    </Combobox>
  );
}
