"use client";

import ProductCard from "@/components/pageComponents/products/ProductCard";
import MotionSection, { MotionItem } from "@/components/commonComponents/MotionSection";

export default function FeaturedProducts({ products, tone = "stone" }) {
  return (
    <MotionSection tone={tone}>
      <MotionItem>
        <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
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
