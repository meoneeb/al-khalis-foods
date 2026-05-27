"use client";

import { AnimatePresence } from "framer-motion";
import ProductCard from "@/components/pageComponents/ProductCard";

export default function ProductGrid({ products }) {
  return (
    <AnimatePresence mode="popLayout">
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </AnimatePresence>
  );
}
