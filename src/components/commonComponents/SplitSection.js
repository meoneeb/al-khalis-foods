import SectionImage from "@/components/commonComponents/SectionImage";
import MotionSection, { MotionItem } from "@/components/commonComponents/MotionSection";

export default function SplitSection({
  title,
  paragraphs,
  image,
  imageAlt,
  reverse = false,
  tone = "stone",
  className = "",
}) {
  return (
    <MotionSection
      tone={tone}
      className={className}
      containerClassName={`grid-split ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}
    >
      <MotionItem>
        <SectionImage src={image} alt={imageAlt ?? title} />
      </MotionItem>
      <MotionItem>
        <h2>{title}</h2>
        <div className="prose-muted mt-6 space-y-4">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </MotionItem>
    </MotionSection>
  );
}
