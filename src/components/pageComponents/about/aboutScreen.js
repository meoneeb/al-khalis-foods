import HeroMotion, {
  HeroMotionItem,
} from "@/components/commonComponents/HeroMotion";
import PageHero from "@/components/commonComponents/PageHero";
import Eyebrow from "@/components/commonComponents/Eyebrow";
import Card from "@/components/commonComponents/Card";
import MotionSection, {
  MotionItem,
} from "@/components/commonComponents/MotionSection";
import SplitSection from "@/components/commonComponents/SplitSection";
import site from "@/data/site.json";

export default function AboutScreen() {
  const { about, images } = site;

  return (
    <>
      <PageHero
        image={about.hero.image ?? images.hero.about}
        align="left"
        size="default"
        priority
        scrim="left"
        contentClassName="max-w-3xl"
      >
        <HeroMotion className="hero-content-shadow">
          <HeroMotionItem>
            <Eyebrow>{about.hero.eyebrow}</Eyebrow>
          </HeroMotionItem>
          <HeroMotionItem>
            <h1 className="hero-heading mt-3 max-w-3xl">{about.hero.title}</h1>
          </HeroMotionItem>
          <HeroMotionItem>
            <p className="hero-subtitle mt-5 max-w-2xl">
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
              <p className="prose-muted">{p}</p>
            </MotionItem>
          ))}
        </div>
      </MotionSection>

      <MotionSection tone="light">
        <MotionItem>
          <h2 className="text-center">{about.values.title}</h2>
          <p className="prose-muted mx-auto mt-4 max-w-2xl text-center">
            {about.values.intro}
          </p>
        </MotionItem>
        <div className="mt-12 grid-cards">
          {about.values.items.map((v) => (
            <MotionItem key={v.title}>
              <Card variant="compact">
                <h3>{v.title}</h3>
                <p className="prose-muted-sm mt-2">{v.body}</p>
              </Card>
            </MotionItem>
          ))}
        </div>
      </MotionSection>

      <MotionSection tone="dark" containerClassName="max-w-3xl space-y-12">
        <MotionItem>
          <article>
            <h2>{about.vision.title}</h2>
            <p className="prose-muted-dark mt-4">{about.vision.body}</p>
          </article>
        </MotionItem>
        <MotionItem>
          <article>
            <h2>{about.commitment.title}</h2>
            <p className="prose-muted-dark mt-4">{about.commitment.body}</p>
          </article>
        </MotionItem>
        <MotionItem>
          <Card variant="highlight">
            <h2>{about.belief.title}</h2>
            <p className="prose-muted-dark mt-4">{about.belief.body}</p>
          </Card>
        </MotionItem>
      </MotionSection>
    </>
  );
}
