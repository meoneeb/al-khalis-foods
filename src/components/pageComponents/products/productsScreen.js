"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductsSearchHero from "@/components/pageComponents/products/ProductsSearchHero";
import ProductGrid from "@/components/pageComponents/products/ProductGrid";
import MotionSection, { MotionItem } from "@/components/commonComponents/MotionSection";
import {
  getAllProducts,
  getProductsPageMeta,
} from "@/lib/products";
import {
  filterCatalogProducts,
  getTypeFilterLabel,
  normalizeTypeParam,
} from "@/lib/catalog-query";

function ProductsResultsSummary({ k, type, count }) {
  const normalizedType = normalizeTypeParam(type);
  const typeLabel = getTypeFilterLabel(normalizedType);

  if (!k && normalizedType === "all") return null;

  let message = `Showing ${count} product${count === 1 ? "" : "s"}`;
  if (k) {
    message += ` for “${k}”`;
  }
  if (normalizedType !== "all") {
    message += k ? ` in ${typeLabel}` : ` in ${typeLabel}`;
  }

  return (
    <MotionItem>
      <p className="text-center text-sm text-muted">{message}</p>
    </MotionItem>
  );
}

function ProductsScreenContent() {
  const searchParams = useSearchParams();
  const k = searchParams.get("k") ?? "";
  const type = normalizeTypeParam(searchParams.get("type"));

  const page = getProductsPageMeta();
  const allProducts = getAllProducts();
  const products = filterCatalogProducts(allProducts, { k, type });

  return (
    <>
      <ProductsSearchHero
        page={page}
        productCount={allProducts.length}
        initialQuery={k}
        initialType={type}
      />

      <MotionSection tone="light">
        <ProductsResultsSummary k={k} type={type} count={products.length} />
        <MotionItem>
          <p className="text-center text-sm text-muted">{page.disclaimer}</p>
        </MotionItem>
        <div className="mt-10">
          {products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <p className="text-center text-sm text-muted">
              No products match your search. Try a different keyword or filter.
            </p>
          )}
        </div>
      </MotionSection>
    </>
  );
}

export default function ProductsScreen() {
  return (
    <Suspense
      fallback={
        <div className="section-container section-inner py-16 text-center text-muted">
          Loading catalog…
        </div>
      }
    >
      <ProductsScreenContent />
    </Suspense>
  );
}
