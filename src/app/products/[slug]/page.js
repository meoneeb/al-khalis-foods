import { notFound } from "next/navigation";
import ProductDetailView from "@/components/pageComponents/ProductDetailView";
import HeroMotion, { HeroMotionItem } from "@/components/commonComponents/HeroMotion";
import {
  getAllProducts,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/products";
import site from "@/data/site.json";

export async function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: `${product.name} | ${site.brand.displayName}`,
    description: product.shortDescription,
    openGraph: {
      images: [product.image],
    },
  };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(slug, 3);

  return (
    <>
      <section className="w-full border-b border-brand-line/30">
        <div className="sectionContainer py-8 md:py-12 pb-8 pt-14 sm:pt-16">
          <HeroMotion>
            <HeroMotionItem>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-spice">
                {product.categoryLabel}
              </p>
            </HeroMotionItem>
          </HeroMotion>
        </div>
      </section>
      <ProductDetailView product={product} related={related} />
    </>
  );
}
