import HeroMotion, { HeroMotionItem } from "@/components/commonComponents/HeroMotion";
import PageHero from "@/components/commonComponents/PageHero";
import ProductCategoryFilter from "@/components/pageComponents/products/ProductCategoryFilter";
import MotionSection, { MotionItem } from "@/components/commonComponents/MotionSection";
import {
  getAllProducts,
  getCategories,
  getProductsPageMeta,
} from "@/lib/products";
import site from "@/data/site.json";

export default function ProductsScreen() {
  const page = getProductsPageMeta();
  const products = getAllProducts();
  const categories = getCategories();
  const heroImage = page.heroImage ?? site.images.hero.products ?? "/images/73612.webp";

  return (
    <>
      <PageHero
        image={heroImage}
        align="left"
        size="default"
        priority
        scrim="left"
        contentClassName="max-w-3xl"
      >
        <HeroMotion className="hero-content-shadow">
          <HeroMotionItem>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-red-500">
              {page.eyebrow}
            </p>
          </HeroMotionItem>
          <HeroMotionItem>
            <h1 className="hero-heading mt-3 max-w-3xl">{page.title}</h1>
          </HeroMotionItem>
          <HeroMotionItem>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-50/95 sm:text-lg">
              {page.subtitle}
            </p>
          </HeroMotionItem>
          <HeroMotionItem>
            <p className="mt-6 text-sm font-medium text-zinc-50/90">
              {products.length} products · 1000g bulk packs
            </p>
          </HeroMotionItem>
        </HeroMotion>
      </PageHero>

      <MotionSection tone="stone">
        <MotionItem>
          <p className="text-center text-sm text-zinc-500">{page.disclaimer}</p>
        </MotionItem>
        <div className="mt-10">
          <ProductCategoryFilter categories={categories} products={products} />
        </div>
      </MotionSection>
    </>
  );
}
