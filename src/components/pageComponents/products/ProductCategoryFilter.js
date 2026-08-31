"use client";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Filter, Flame, ChefHat, Cake } from "lucide-react";
import ProductGrid from "./ProductGrid";

const CATEGORY_ICONS = {
  all: Filter,
  "bulk-spices": Flame,
  "bulk-recipe": ChefHat,
  dessert: Cake,
};

export default function ProductCategoryFilter({ categories, products }) {
  const tabs = [
    { id: "all", label: "All", products },
    ...categories.map((c) => ({
      id: c.id,
      label: c.label,
      products: products.filter((p) => p.category === c.id),
    })),
  ];

  return (
    <TabGroup>
      <TabList className="flex flex-wrap justify-center gap-2 sm:gap-3">
        {tabs.map((tab) => {
          const Icon = CATEGORY_ICONS[tab.id] ?? Filter;
          return (
            <Tab key={tab.id} className="chip-tab">
              <Icon className="h-4 w-4 shrink-0" aria-hidden />
              {tab.label}
              <span className="rounded-full bg-surface-stone px-2 py-0.5 text-xs data-selected:bg-white/25">
                {tab.products.length}
              </span>
            </Tab>
          );
        })}
      </TabList>
      <TabPanels className="mt-10">
        {tabs.map((tab) => (
          <TabPanel key={tab.id}>
            <ProductGrid products={tab.products} />
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
}
