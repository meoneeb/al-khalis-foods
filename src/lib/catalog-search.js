import { getAllProducts } from "@/lib/products";

export const CATALOG_SEARCH_TYPES = [
  { id: "bulk-spices", label: "Spices", placeholder: "Search spices…" },
  { id: "bulk-recipe", label: "Recipe mix", placeholder: "Search recipe mixes…" },
];

export const DEFAULT_FUSE_OPTIONS = {
  keys: ["name", "id", "categoryLabel"],
  threshold: 0.38,
  ignoreLocation: true,
};

export function getCatalogProducts(categoryId, products = getAllProducts()) {
  if (!categoryId) return products;
  return products.filter((p) => p.category === categoryId);
}
