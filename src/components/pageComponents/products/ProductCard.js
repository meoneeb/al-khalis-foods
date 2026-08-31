"use client";

import Link from "next/link";
import { m } from "framer-motion";
import { ArrowRight, Package } from "lucide-react";
import clsx from "clsx";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import ProductImage from "./ProductImage";

export default function ProductCard({ product }) {
  const reduced = usePrefersReducedMotion();
  const Wrapper = reduced ? "article" : m.article;

  return (
    <Wrapper
      layout={!reduced}
      className={clsx("group flex flex-col card card-interactive")}
    >
      <Link href={`/products/${product.id}`} className="flex flex-col">
        <ProductImage
          src={product.image}
          alt={product.imageAlt}
          category={product.category}
          className="rounded-none rounded-t-2xl border-0 bg-surface-stone"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
        />
        <div className="flex flex-1 flex-col card-body-compact">
          <p className="eyebrow eyebrow-accent tracking-wider">
            {product.categoryLabel}
          </p>
          <h3 className="mt-2 line-clamp-2 group-hover:text-brand-hover">
            {product.name}
          </h3>
          <p className="prose-muted-sm mt-2 line-clamp-2 flex-1">
            {product.shortDescription}
          </p>
          <div className="mt-4 flex items-center justify-between gap-3 border-t border-border/40 pt-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted">
              <Package className="h-3.5 w-3.5 shrink-0 text-brand" aria-hidden />
              {product.packSize}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-hover">
              View
              <ArrowRight
                className="h-3.5 w-3.5 transition group-hover:translate-x-0.5"
              />
            </span>
          </div>
        </div>
      </Link>
    </Wrapper>
  );
}
