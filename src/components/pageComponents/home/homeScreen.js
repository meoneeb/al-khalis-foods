import HomeHero from "@/components/pageComponents/home/HomeHero";
import SectionImage from "@/components/commonComponents/SectionImage";
import MotionSection, {
  MotionItem,
} from "@/components/commonComponents/MotionSection";
import Eyebrow from "@/components/commonComponents/Eyebrow";
import Card from "@/components/commonComponents/Card";
import AudienceChips from "@/components/pageComponents/home/AudienceChips";
import FeaturedProducts from "@/components/pageComponents/home/FeaturedProducts";
import SplitSection from "@/components/commonComponents/SplitSection";
import site from "@/data/site.json";
import { getProductBySlug } from "@/lib/products";

export default function HomeScreen() {
  const { home, brand, focus, images } = site;
  const featured = home.featuredProductIds
    .map((id) => getProductBySlug(id))
    .filter(Boolean);

  return (
    <>
      <HomeHero
        hero={home.hero}
        imageSrc={images.hero.home ?? "/images/30722.webp"}
      />

      <MotionSection
        tone="stone"
        containerClassName="max-w-4xl mx-auto text-center"
      >
        <MotionItem>
          <h2 className="capitalize">
            Built for{" "}
            <span className="gradient-text">professional kitchens</span>
          </h2>
        </MotionItem>
        <MotionItem>
          <p className="prose-muted mt-6">{focus.mainFocus[0]}</p>
        </MotionItem>
        <AudienceChips audiences={focus.audiences} />
      </MotionSection>

      <SplitSection
        title="Complete range for food service"
        paragraphs={focus.mainFocus.slice(1)}
        image={images.commercialKitchen}
        imageAlt="Commercial kitchen spice solutions"
        reverse
        tone="light"
      />

      <MotionSection tone="dark">
        <MotionItem>
          <Eyebrow align="center">Our Range</Eyebrow>
          <h2 className="mt-3 text-center">Complete Commercial Solutions</h2>
        </MotionItem>
        <MotionItem>
          <SectionImage
            src={images.productRange}
            alt="Complete commercial spice range"
            className="mt-10 !aspect-[3/1] w-full border-zinc-800 shadow-none"
          />
        </MotionItem>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {focus.productRange.map((item) => (
            <MotionItem key={item}>
              <Card variant="dark" as="div">{item}</Card>
            </MotionItem>
          ))}
        </ul>
      </MotionSection>

      <MotionSection tone="light">
        <MotionItem>
          <Eyebrow variant="muted" align="center">Why Al-Khalis Prime Foods</Eyebrow>
        </MotionItem>
        <div className="mt-10 grid-cards">
          {home.pillars.map((p) => (
            <MotionItem key={p.title}>
              <Card>
                {p.image ? (
                  <div className="relative aspect-[16/9]">
                    <SectionImage
                      src={p.image}
                      alt={p.title}
                      className="rounded-none rounded-t-2xl border-0"
                    />
                  </div>
                ) : null}
                <div className="card-body">
                  <h3>{p.title}</h3>
                  <p className="prose-muted-sm mt-3">{p.body}</p>
                </div>
              </Card>
            </MotionItem>
          ))}
        </div>
      </MotionSection>

      <FeaturedProducts products={featured} tone="stone" />

      <MotionSection tone="dark" containerClassName="grid-split">
        <MotionItem>
          <SectionImage
            src={home.ltg.image ?? images.ltg}
            alt="Low temperature grinding"
          />
        </MotionItem>
        <MotionItem>
          <h2>{home.ltg.title}</h2>
          <p className="prose-muted-dark mt-4">{home.ltg.body}</p>
          <p className="mt-8 text-sm text-muted-dark">{brand.scopeNote}</p>
        </MotionItem>
      </MotionSection>
    </>
  );
}
