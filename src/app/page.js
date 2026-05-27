import HomeHero from "@/components/pageComponents/HomeHero";
import SectionImage from "@/components/commonComponents/SectionImage";
import MotionSection, {
  MotionItem,
} from "@/components/commonComponents/MotionSection";
import AudienceChips from "@/components/pageComponents/AudienceChips";
import FeaturedProducts from "@/components/pageComponents/FeaturedProducts";
import SplitSection from "@/components/commonComponents/SplitSection";
import site from "@/data/site.json";
import { getProductBySlug } from "@/lib/products";

export default function HomePage() {
  const { home, brand, focus, images } = site;
  const featured = home.featuredProductIds
    .map((id) => getProductBySlug(id))
    .filter(Boolean);

  return (
    <>
      <HomeHero
        hero={home.hero}
        imageSrc="/images/ginger-powder.webp"
        imageAlt="Al-Khalis Prime commercial spices"
      />

      <MotionSection containerClassName="max-w-4xl mx-auto text-center">
        <MotionItem>
          <h2 className="capitalize">
            Built for{" "}
            <span className="gradient-text">professional kitchens</span>
          </h2>
        </MotionItem>
        <MotionItem>
          <p className="mt-6 text-base leading-relaxed text-brand-muted">
            {focus.mainFocus[0]}
          </p>
        </MotionItem>
        <AudienceChips audiences={focus.audiences} />
      </MotionSection>

      <SplitSection
        title="Complete range for food service"
        paragraphs={focus.mainFocus.slice(1)}
        image={images.commercialKitchen}
        imageAlt="Commercial kitchen spice solutions"
        reverse
      />

      <MotionSection>
        <MotionItem>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-brand-muted">
            Our range
          </p>
          <h2 className="mt-3 text-center">Complete commercial solutions</h2>
        </MotionItem>
        <MotionItem>
          <div className="relative mt-10 overflow-hidden rounded-2xl">
            <SectionImage
              src={images.productRange}
              alt="Product range"
              className="aspect-[21/9] max-h-64 w-full"
            />
          </div>
        </MotionItem>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {focus.productRange.map((item) => (
            <MotionItem key={item}>
              <div className="rounded-xl border border-brand-line/50 bg-brand-elevated px-4 py-3 text-sm font-medium text-brand-cream">
                {item}
              </div>
            </MotionItem>
          ))}
        </ul>
      </MotionSection>

      <MotionSection>
        <MotionItem>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-brand-muted">
            Why AL-KHALIS PRIME
          </p>
        </MotionItem>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {home.pillars.map((p) => (
            <MotionItem key={p.title}>
              <article className="overflow-hidden rounded-2xl border border-brand-line/60 bg-brand-card/90 shadow-sm">
                {p.image ? (
                  <div className="relative aspect-[16/9]">
                    <SectionImage
                      src={p.image}
                      alt={p.title}
                      className="rounded-none rounded-t-2xl border-0"
                    />
                  </div>
                ) : null}
                <div className="p-6">
                  <h3>{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-brand-muted">
                    {p.body}
                  </p>
                </div>
              </article>
            </MotionItem>
          ))}
        </div>
      </MotionSection>

      <FeaturedProducts products={featured} />

      <MotionSection containerClassName="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <MotionItem>
          <SectionImage
            src={home.ltg.image ?? images.ltg}
            alt="Low temperature grinding"
          />
        </MotionItem>
        <MotionItem>
          <h2>{home.ltg.title}</h2>
          <p className="mt-4 text-base leading-relaxed text-brand-muted">
            {home.ltg.body}
          </p>
          <p className="mt-8 text-sm text-brand-muted">{brand.scopeNote}</p>
        </MotionItem>
      </MotionSection>
    </>
  );
}
