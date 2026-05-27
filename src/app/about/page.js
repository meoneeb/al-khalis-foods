import HeroMotion, { HeroMotionItem } from "@/components/commonComponents/HeroMotion";
import SectionImage from "@/components/commonComponents/SectionImage";
import MotionSection, { MotionItem } from "@/components/commonComponents/MotionSection";
import SplitSection from "@/components/commonComponents/SplitSection";
import site from "@/data/site.json";

export default function AboutPage() {
  const { about, images } = site;

  return (
    <>
      <section className="w-full border-b border-brand-line/30">
        <div className="sectionContainer grid items-center gap-10 py-8 md:py-12 lg:grid-cols-2 lg:gap-14">
          <HeroMotion>
            <HeroMotionItem>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-spice">
                {about.hero.eyebrow}
              </p>
            </HeroMotionItem>
            <HeroMotionItem>
              <h1 className="mt-3 max-w-3xl">{about.hero.title}</h1>
            </HeroMotionItem>
            <HeroMotionItem>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-brand-muted sm:text-lg">
                {about.hero.subtitle}
              </p>
            </HeroMotionItem>
          </HeroMotion>
          <SectionImage
            src={about.hero.image ?? images.hero.about}
            alt="About Al-Khalis Prime"
            priority
            className="max-lg:mx-auto max-lg:max-w-md"
          />
        </div>
      </section>

      <SplitSection
        title={about.commercialFocus.title}
        paragraphs={about.commercialFocus.paragraphs}
        image={about.commercialFocus.image ?? images.commercialKitchen}
        imageAlt="Food service spice solutions"
      />

      <SplitSection
        title={about.quality.title}
        paragraphs={about.quality.paragraphs}
        image={about.quality.image ?? images.quality}
        imageAlt="Quality assured spices"
        reverse
      />

      <MotionSection containerClassName="max-w-3xl mx-auto">
        <MotionItem>
          <h2>{about.story.title}</h2>
        </MotionItem>
        <div className="mt-6 space-y-4">
          {about.story.paragraphs.map((p, i) => (
            <MotionItem key={i}>
              <p className="text-base leading-relaxed text-brand-muted">{p}</p>
            </MotionItem>
          ))}
        </div>
      </MotionSection>

      <MotionSection>
        <MotionItem>
          <h2 className="text-center">{about.values.title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-brand-muted">
            {about.values.intro}
          </p>
        </MotionItem>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {about.values.items.map((v) => (
            <MotionItem key={v.title}>
              <article className="rounded-2xl border border-brand-line/50 bg-brand-elevated p-5">
                <h3>{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-muted">
                  {v.body}
                </p>
              </article>
            </MotionItem>
          ))}
        </div>
      </MotionSection>

      <section className="w-full">
        <div className="sectionContainer max-w-3xl space-y-12 py-8 md:py-12">
          <article>
            <h2>{about.vision.title}</h2>
            <p className="mt-4 text-base leading-relaxed text-brand-muted">
              {about.vision.body}
            </p>
          </article>
          <article>
            <h2>{about.commitment.title}</h2>
            <p className="mt-4 text-base leading-relaxed text-brand-muted">
              {about.commitment.body}
            </p>
          </article>
          <article className="rounded-2xl border border-brand-spice/25 bg-brand-spice/5 p-6">
            <h2>{about.belief.title}</h2>
            <p className="mt-4 text-base leading-relaxed text-brand-muted">
              {about.belief.body}
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
