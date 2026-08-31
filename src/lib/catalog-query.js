import Fuse from "fuse.js";
import { DEFAULT_FUSE_OPTIONS } from "@/lib/catalog-search";

export const CATALOG_TYPE_FILTERS = [
  { param: "all", categoryId: null, label: "All" },
  { param: "spices", categoryId: "bulk-spices", label: "Spices" },
  { param: "recipe", categoryId: "bulk-recipe", label: "Recipe mix" },
  { param: "dessert", categoryId: "dessert", label: "Dessert" },
];

export function normalizeTypeParam(type) {
  if (!type) return "all";
  const match = CATALOG_TYPE_FILTERS.find((t) => t.param === type);
  return match?.param ?? "all";
}

export function typeParamToCategoryId(type) {
  const normalized = normalizeTypeParam(type);
  return (
    CATALOG_TYPE_FILTERS.find((t) => t.param === normalized)?.categoryId ?? null
  );
}

export function getTypeFilterLabel(type) {
  const normalized = normalizeTypeParam(type);
  return (
    CATALOG_TYPE_FILTERS.find((t) => t.param === normalized)?.label ?? "All"
  );
}

export function buildProductsSearchHref({ k = "", type = "all" } = {}) {
  const params = new URLSearchParams();
  const trimmed = k.trim();
  const normalizedType = normalizeTypeParam(type);

  if (trimmed) params.set("k", trimmed);
  if (normalizedType !== "all") params.set("type", normalizedType);

  const qs = params.toString();
  return qs ? `/products?${qs}` : "/products";
}

export function filterCatalogProducts(products, { k = "", type = "all" } = {}) {
  const categoryId = typeParamToCategoryId(type);
  let pool = categoryId
    ? products.filter((p) => p.category === categoryId)
    : products;

  const trimmed = k.trim();
  if (!trimmed) return pool;

  const fuse = new Fuse(pool, {
    ...DEFAULT_FUSE_OPTIONS,
    minMatchCharLength: 1,
  });

  return fuse.search(trimmed).map((r) => r.item);
}
