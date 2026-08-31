"use client";

import { AnimatePresence } from "framer-motion";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {
  return (
    <AnimatePresence mode="popLayout">
      <ul className="grid-cards">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </AnimatePresence>
  );
}
