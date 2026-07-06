"use client";

import Link from "next/link";
import { m } from "framer-motion";
import { ArrowRight, Package } from "lucide-react";
import ProductImage from "./ProductImage";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

export default function ProductCard({ product }) {
  const reduced = usePrefersReducedMotion();
  const Wrapper = reduced ? "div" : m.article;

  return (
    <Wrapper
      layout={!reduced}
      className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:border-red-500/50 hover:shadow-md"
    >
      <Link href={`/products/${product.id}`} className="block">
        <ProductImage
          src={product.image}
          alt={product.imageAlt}
          category={product.category}
          className="rounded-none rounded-t-2xl"
        />
        <div className="flex flex-1 flex-col p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-red-500">
            {product.categoryLabel}
          </p>
          <h3 className="mt-2 group-hover:text-red-600">
            {product.name}
          </h3>
          <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-zinc-500">
            {product.shortDescription}
          </p>
          <div className="mt-4 flex items-center justify-between border-t border-zinc-200/40 pt-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500">
              <Package className="h-3.5 w-3.5 text-red-500" aria-hidden />
              {product.packSize}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-600">
              View
              <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </Wrapper>
  );
}
