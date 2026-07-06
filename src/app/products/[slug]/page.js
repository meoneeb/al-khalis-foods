import { notFound } from "next/navigation";
import ProductDetailScreen from "@/components/pageComponents/products/productDetailScreen";
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

export default async function Page({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(slug, 3);

  return <ProductDetailScreen product={product} related={related} />;
}
