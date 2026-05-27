import Link from "next/link";
import { ChevronLeft, Package } from "lucide-react";
import ProductImage from "@/components/pageComponents/ProductImage";
import ProductCard from "@/components/pageComponents/ProductCard";

export default function ProductDetailView({ product, related }) {
  return (
    <section className="w-full">
      <div className="sectionContainer py-8 md:py-12 pb-20">
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-muted transition hover:text-brand-primary"
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
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-spice">
              {product.categoryLabel}
            </p>
            <h1 className="mt-3 text-3xl sm:text-4xl">{product.name}</h1>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-card px-4 py-2 text-sm font-medium text-brand-ink">
              <Package className="h-4 w-4 text-brand-saffron" aria-hidden />
              {product.packSize} bulk pack
            </p>
            <p className="mt-6 text-base leading-relaxed text-brand-muted">
              {product.shortDescription}
            </p>
            <ul className="mt-8 space-y-3 border-t border-brand-line/50 pt-8">
              {product.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-3 text-sm text-brand-muted"
                >
                  <span
                    className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-primary"
                    aria-hidden
                  />
                  {h}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-xs text-brand-muted">
              Product information is for display only. Contact your distributor for
              availability and ordering.
            </p>
          </div>
        </div>

        {related.length > 0 ? (
          <div className="mt-20 border-t border-brand-line/50 pt-14">
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
