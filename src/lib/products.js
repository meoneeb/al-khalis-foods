import productsData from "@/data/products.json";

export function getAllProducts() {
  return productsData.items;
}

export function getProductBySlug(slug) {
  return productsData.items.find((p) => p.id === slug) ?? null;
}

export function getCategories() {
  return productsData.categories;
}

export function getProductsByCategory(categoryId, limit) {
  const items = productsData.items.filter((p) => p.category === categoryId);
  return limit != null ? items.slice(0, limit) : items;
}

export function getProductsPageMeta() {
  return productsData.page;
}

export function getRelatedProducts(slug, limit = 3) {
  const product = getProductBySlug(slug);
  if (!product) return [];
  return productsData.items
    .filter((p) => p.category === product.category && p.id !== slug)
    .slice(0, limit);
}

export function getProductsData() {
  return productsData;
}
