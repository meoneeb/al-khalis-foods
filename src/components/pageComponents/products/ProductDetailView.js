import Link from "next/link";
import { ChevronLeft, Package } from "lucide-react";
import ProductImage from "./ProductImage";
import ProductCard from "./ProductCard";

export default function ProductDetailView({ product, related }) {
  return (
    <section className="section-tone-light w-full">
      <div className="section-container py-8 pb-20 md:py-12">
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition hover:text-red-600"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden />
          Back to catalog
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <ProductImage
            src={product.image}
            alt={product.imageAlt}
            category={product.category}
            priority
            className="lg:sticky lg:top-24 lg:self-start"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-stone-100 px-4 py-2 text-sm font-medium text-zinc-900">
              <Package className="h-4 w-4 text-red-500" aria-hidden />
              {product.packSize} bulk pack
            </p>
            <p className="mt-6 text-base leading-relaxed text-zinc-500">
              {product.shortDescription}
            </p>
            <ul className="mt-8 space-y-3 border-t border-zinc-200 pt-8">
              {product.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-3 text-sm text-zinc-500"
                >
                  <span
                    className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-red-600"
                    aria-hidden
                  />
                  {h}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-xs text-zinc-500">
              Product information is for display only. Contact your distributor for
              availability and ordering.
            </p>
          </div>
        </div>

        {related.length > 0 ? (
          <div className="mt-20 border-t border-zinc-200 pt-14">
            <h2>Related products</h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <li key={p.id}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
