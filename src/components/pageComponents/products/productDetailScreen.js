import Eyebrow from "@/components/commonComponents/Eyebrow";
import ProductDetailView from "@/components/pageComponents/products/ProductDetailView";

export default function ProductDetailScreen({ product, related }) {
  return (
    <>
      <section className="section-tone-stone w-full border-b border-border">
        <div className="section-container section-inner">
          <Eyebrow>{product.categoryLabel}</Eyebrow>
          <h1 className="mt-3 max-w-3xl">{product.name}</h1>
        </div>
      </section>
      <ProductDetailView product={product} related={related} />
    </>
  );
}
