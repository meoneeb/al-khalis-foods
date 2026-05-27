"use client";

import ProductCard from "@/components/pageComponents/ProductCard";
import MotionSection, { MotionItem } from "@/components/commonComponents/MotionSection";

export default function FeaturedProducts({ products }) {
  return (
    <MotionSection>
      <MotionItem>
        <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-brand-muted">
          Featured from our catalog
        </p>
        <h2 className="mt-3 text-center">Popular bulk SKUs</h2>
      </MotionItem>
      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </MotionSection>
  );
}
