import Eyebrow from "@/components/commonComponents/Eyebrow";
import CatalogSearch from "@/components/commonComponents/CatalogSearch";

export default function ProductsSearchHero({
  page,
  productCount,
  initialQuery = "",
  initialType = "all",
}) {
  return (
    <section className="section-tone-stone w-full border-b border-border">
      <div className="section-container section-inner mx-auto max-w-3xl text-center">
        <Eyebrow align="center">{page.eyebrow}</Eyebrow>
        <h1 className="mt-3">{page.title}</h1>
        <p className="prose-muted mt-4">{page.subtitle}</p>
        <p className="mt-2 text-sm text-muted">
          {productCount} products · 1000g bulk packs
        </p>
        <CatalogSearch
          key={`${initialQuery}-${initialType}`}
          className="mt-8"
          initialQuery={initialQuery}
          initialType={initialType}
          showTypeFilter
          submitBehavior="redirect"
        />
      </div>
    </section>
  );
}
