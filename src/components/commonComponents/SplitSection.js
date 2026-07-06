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
      containerClassName={`grid items-center gap-10 lg:grid-cols-2 lg:gap-14 ${
        reverse ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      <MotionItem>
        <SectionImage src={image} alt={imageAlt ?? title} />
      </MotionItem>
      <MotionItem>
        <h2>{title}</h2>
        <div className="mt-6 space-y-4 text-base leading-relaxed text-zinc-500">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </MotionItem>
    </MotionSection>
  );
}
