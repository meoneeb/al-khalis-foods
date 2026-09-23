import Link from "next/link";
import { ChevronLeft, Package } from "lucide-react";
import Chip from "@/components/commonComponents/Chip";
import ProductImage from "./ProductImage";
import ProductCard from "./ProductCard";

export default function ProductDetailView({ product, related }) {
  return (
    <section className="section-tone-light w-full">
      <div className="section-container py-8 pb-20 md:py-12">
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition hover:text-brand-hover"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden />
          Back to catalog
        </Link>

        <div className="mt-8 grid items-start gap-10 lg:grid-cols-[minmax(0,28rem)_1fr] lg:gap-14">
          <ProductImage
            src={product.image}
            alt={product.imageAlt}
            priority
            className="mx-auto w-full max-w-xs border border-border bg-white shadow-sm sm:max-w-sm lg:sticky lg:top-24 lg:mx-0 lg:max-w-none"
            sizes="(max-width: 1024px) 80vw, 448px"
          />
          <div className="min-w-0">
            <Chip icon={Package} className="mt-2">
              {product.packSize} bulk pack
            </Chip>
            <p className="prose-muted mt-6">{product.shortDescription}</p>
            <ul className="mt-8 space-y-3 border-t border-border pt-8">
              {product.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-3 text-sm text-muted"
                >
                  <span
                    className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-hover"
                    aria-hidden
                  />
                  {h}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-xs text-muted">
              Product information is for display only. Contact your distributor
              for availability and ordering.
            </p>
          </div>
        </div>

        {related.length > 0 ? (
          <div className="mt-20 border-t border-border pt-14">
            <h2>Related products</h2>
            <ul className="mt-8 grid-cards">
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
