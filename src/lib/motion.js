/** Shared motion tokens — import in MotionSection, HeroMotion, and animated components. */

export const EASE_OUT = [0.22, 1, 0.36, 1];

export function staggerContainer(staggerChildren = 0.08) {
  return {
    hidden: {},
    show: { transition: { staggerChildren } },
  };
}

export function fadeUpItem(y = 20, duration = 0.45) {
  return {
    hidden: { opacity: 0, y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration, ease: EASE_OUT },
    },
  };
}

export const sectionMotion = {
  container: staggerContainer(0.08),
  item: fadeUpItem(20, 0.45),
};

export const heroMotion = {
  container: staggerContainer(0.1),
  item: fadeUpItem(24, 0.5),
};

export const chipMotion = (index, duration = 0.35) => ({
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay: index * 0.06, duration },
});
