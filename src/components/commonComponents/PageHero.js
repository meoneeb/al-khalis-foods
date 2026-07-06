import Image from "next/image";
import clsx from "clsx";

const HEIGHT = {
  tall: "min-h-[85vh] sm:min-h-[90vh]",
  default: "min-h-[52vh] sm:min-h-[58vh]",
  compact: "min-h-[30vh] sm:min-h-[34vh]",
};

const PADDING = {
  tall: "py-16 sm:py-20",
  default: "py-14 sm:py-16",
  compact: "py-10 sm:py-12",
};

export default function PageHero({
  image,
  align = "left",
  size = "default",
  priority = false,
  scrim = "default",
  contentClassName = "",
  children,
}) {
  const centered = align === "center";
  const heightClass = HEIGHT[size] ?? HEIGHT.default;
  const paddingClass = PADDING[size] ?? PADDING.default;

  return (
    <section className={clsx("page-hero", heightClass)}>
      <div className="absolute inset-0 z-0" aria-hidden>
        <Image
          src={image}
          alt=""
          fill
          priority={priority}
          quality={90}
          sizes="100vw"
          className="hero-media__image"
        />
        <div className="hero-media__vignette absolute inset-0" />
        <div
          className={clsx(
            "absolute inset-0",
            scrim === "left" ? "hero-media__scrim--left" : "hero-media__scrim",
          )}
        />
      </div>

      <div
        className={clsx(
          "section-container relative z-10 flex flex-col justify-center",
          heightClass,
          paddingClass,
          centered && "items-center text-center",
          contentClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}
