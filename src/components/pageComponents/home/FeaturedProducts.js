"use client";

import ProductCard from "@/components/pageComponents/products/ProductCard";
import MotionSection, { MotionItem } from "@/components/commonComponents/MotionSection";
import Eyebrow from "@/components/commonComponents/Eyebrow";

export default function FeaturedProducts({ products, tone = "stone" }) {
  return (
    <MotionSection tone={tone}>
      <MotionItem>
        <Eyebrow variant="muted" align="center">Featured from our catalog</Eyebrow>
        <h2 className="mt-3 text-center">Popular bulk SKUs</h2>
      </MotionItem>
      <ul className="mt-10 grid-cards">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </MotionSection>
  );
}
