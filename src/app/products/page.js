import HeroMotion, { HeroMotionItem } from "@/components/commonComponents/HeroMotion";
import SectionImage from "@/components/commonComponents/SectionImage";
import ProductCategoryFilter from "@/components/pageComponents/ProductCategoryFilter";
import MotionSection, { MotionItem } from "@/components/commonComponents/MotionSection";
import {
  getAllProducts,
  getCategories,
  getProductsPageMeta,
} from "@/lib/products";
import site from "@/data/site.json";

export default function ProductsPage() {
  const page = getProductsPageMeta();
  const products = getAllProducts();
  const categories = getCategories();
  const heroImage = page.heroImage ?? site.images.hero.products;

  return (
    <>
      <section className="w-full border-b border-brand-line/30">
        <div className="sectionContainer grid items-center gap-10 py-8 md:py-12 lg:grid-cols-2 lg:gap-14">
          <HeroMotion>
            <HeroMotionItem>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-spice">
                {page.eyebrow}
              </p>
            </HeroMotionItem>
            <HeroMotionItem>
              <h1 className="mt-3 max-w-3xl">{page.title}</h1>
            </HeroMotionItem>
            <HeroMotionItem>
              <p className="mt-5 text-base leading-relaxed text-brand-muted sm:text-lg">
                {page.subtitle}
              </p>
            </HeroMotionItem>
            <HeroMotionItem>
              <p className="mt-6 text-sm font-medium text-brand-ink">
                {products.length} products · 1000g bulk packs
              </p>
            </HeroMotionItem>
          </HeroMotion>
          <SectionImage
            src={heroImage}
            alt="Al-Khalis Prime product catalog"
            priority
            className="max-lg:mx-auto max-lg:max-w-md"
          />
        </div>
      </section>

      <MotionSection>
        <MotionItem>
          <p className="text-center text-sm text-brand-muted">{page.disclaimer}</p>
        </MotionItem>
        <div className="mt-10">
          <ProductCategoryFilter categories={categories} products={products} />
        </div>
      </MotionSection>
    </>
  );
}
