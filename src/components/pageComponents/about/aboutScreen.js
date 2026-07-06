import HeroMotion, { HeroMotionItem } from "@/components/commonComponents/HeroMotion";
import PageHero from "@/components/commonComponents/PageHero";
import MotionSection, { MotionItem } from "@/components/commonComponents/MotionSection";
import SplitSection from "@/components/commonComponents/SplitSection";
import site from "@/data/site.json";

export default function AboutScreen() {
  const { about, images } = site;

  return (
    <>
      <PageHero
        image={about.hero.image ?? images.hero.about ?? "/images/ginger-powder.webp"}
        align="left"
        size="default"
        priority
        scrim="left"
        contentClassName="max-w-3xl"
      >
        <HeroMotion className="hero-content-shadow">
          <HeroMotionItem>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-red-500">
              {about.hero.eyebrow}
            </p>
          </HeroMotionItem>
          <HeroMotionItem>
            <h1 className="hero-heading mt-3 max-w-3xl">{about.hero.title}</h1>
          </HeroMotionItem>
          <HeroMotionItem>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-50/95 sm:text-lg">
              {about.hero.subtitle}
            </p>
          </HeroMotionItem>
        </HeroMotion>
      </PageHero>

      <SplitSection
        title={about.commercialFocus.title}
        paragraphs={about.commercialFocus.paragraphs}
        image={about.commercialFocus.image ?? images.commercialKitchen}
        imageAlt="Food service spice solutions"
        tone="stone"
      />

      <SplitSection
        title={about.quality.title}
        paragraphs={about.quality.paragraphs}
        image={about.quality.image ?? images.quality}
        imageAlt="Quality assured spices"
        reverse
        tone="light"
      />

      <MotionSection tone="stone" containerClassName="max-w-3xl mx-auto">
        <MotionItem>
          <h2>{about.story.title}</h2>
        </MotionItem>
        <div className="mt-6 space-y-4">
          {about.story.paragraphs.map((p, i) => (
            <MotionItem key={i}>
              <p className="text-base leading-relaxed text-zinc-500">{p}</p>
            </MotionItem>
          ))}
        </div>
      </MotionSection>

      <MotionSection tone="light">
        <MotionItem>
          <h2 className="text-center">{about.values.title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-zinc-500">
            {about.values.intro}
          </p>
        </MotionItem>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {about.values.items.map((v) => (
            <MotionItem key={v.title}>
              <article className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
                <h3>{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                  {v.body}
                </p>
              </article>
            </MotionItem>
          ))}
        </div>
      </MotionSection>

      <MotionSection tone="dark" containerClassName="max-w-3xl space-y-12">
        <MotionItem>
          <article>
            <h2>{about.vision.title}</h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-400">
              {about.vision.body}
            </p>
          </article>
        </MotionItem>
        <MotionItem>
          <article>
            <h2>{about.commitment.title}</h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-400">
              {about.commitment.body}
            </p>
          </article>
        </MotionItem>
        <MotionItem>
          <article className="rounded-2xl border border-red-500/30 bg-zinc-900 p-6">
            <h2>{about.belief.title}</h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-400">
              {about.belief.body}
            </p>
          </article>
        </MotionItem>
      </MotionSection>
    </>
  );
}
