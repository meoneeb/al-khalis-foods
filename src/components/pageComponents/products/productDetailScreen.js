import HeroMotion, { HeroMotionItem } from "@/components/commonComponents/HeroMotion";
import PageHero from "@/components/commonComponents/PageHero";
import ProductDetailView from "@/components/pageComponents/products/ProductDetailView";

export default function ProductDetailScreen({ product, related }) {
  return (
    <>
      <PageHero
        image={product.image}
        align="left"
        size="compact"
        scrim="left"
        contentClassName="max-w-4xl"
      >
        <HeroMotion className="hero-content-shadow">
          <HeroMotionItem>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-red-500">
              {product.categoryLabel}
            </p>
          </HeroMotionItem>
          <HeroMotionItem>
            <h1 className="hero-heading mt-3">{product.name}</h1>
          </HeroMotionItem>
        </HeroMotion>
      </PageHero>
      <ProductDetailView product={product} related={related} />
    </>
  );
}
