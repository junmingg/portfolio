import { motion, useReducedMotion } from "framer-motion";
import { site, socials } from "@/data/site";
import portrait from "@/assets/portrait.webp";
import { HeroTerminal } from "./HeroTerminal";
import { useRichMotion } from "@/hooks/use-rich-motion";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;
const DURATION = 0.9;

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

// Entrance variants are tuned to the device. On strong (desktop-class) hardware
// items fade + slide with a soft blur — including the glass surfaces, whose
// `backdrop-filter` the GPU composites without trouble. On touch devices we
// avoid animating opacity/filter on those glass surfaces: doing so makes the
// browser recomposite the frosted backdrop as the transition ends (a
// frosted→opaque "pop" on desktop Chrome, a dropped animation that snaps to the
// end on iOS Safari). There, the glass items slide in on transform alone.
function makeVariants(rich: boolean) {
  const transition = { duration: DURATION, ease: EASE };
  const item = {
    hidden: rich ? { opacity: 0, y: 20, filter: "blur(8px)" } : { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, ...(rich ? { filter: "blur(0px)" } : {}), transition },
  };
  const glassItem = rich
    ? item
    : { hidden: { y: 24 }, show: { y: 0, transition } };
  return { item, glassItem };
}

export function Hero({ ready }: { ready: boolean }) {
  const reduceMotion = useReducedMotion();
  const rich = useRichMotion();
  const { item, glassItem } = makeVariants(rich);

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden px-6 pt-28"
    >
      {/* Atmospheric background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -left-32 top-10 h-[36rem] w-[36rem] rounded-full blur-[120px]"
          style={{ background: "var(--glow-a)" }}
        />
        <div
          className="absolute -right-24 bottom-0 h-[30rem] w-[30rem] rounded-full blur-[120px]"
          style={{ background: "var(--glow-b)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
          }}
        />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate={ready ? "show" : "hidden"}
        className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]"
      >
        {/* Text column */}
        <div>
          {/* The terminal's ASCII banner is the visible identity at every
              viewport, so the serif name + role are kept in the DOM (sr-only)
              for SEO and screen readers but hidden visually. */}
          <motion.h1 variants={item} className="sr-only">
            {site.name}
          </motion.h1>

          <motion.p variants={item} className="sr-only">
            {site.role}
          </motion.p>

          <motion.p
            variants={item}
            className="text-mono-label mb-6 flex items-center gap-3"
          >
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-accent" />
            Open to AI / ML Engineering roles
          </motion.p>

          <motion.div variants={glassItem} className="mt-6 max-w-2xl">
            <HeroTerminal text={site.tagline} start={ready} />
          </motion.div>

          <motion.div
            variants={item}
            className="mt-10 grid grid-cols-3 gap-3"
          >
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:text-foreground"
              >
                <Icon className="size-[18px] transition-colors group-hover:text-accent" />
                <span>{label}</span>
              </a>
            ))}
          </motion.div>
        </div>

        {/* Portrait column — hidden below lg to preserve the mobile fold */}
        <motion.div
          variants={glassItem}
          className="relative ml-auto hidden w-full max-w-[390px] lg:block"
        >
          {/* Soft amber glow behind the frame */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-8 -z-10 rounded-full blur-[90px]"
            style={{ background: "var(--glow-a)" }}
          />
          <motion.div
            initial={reduceMotion ? undefined : { scale: 1.04 }}
            animate={reduceMotion ? undefined : { scale: 1 }}
            transition={{ duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="glass relative overflow-hidden rounded-[var(--radius-card)] p-2"
          >
            <img
              src={portrait}
              alt="Portrait of Chen Jun Ming"
              width={1148}
              height={1000}
              fetchPriority="high"
              decoding="async"
              className="aspect-[4/5] w-full rounded-[calc(var(--radius-card)-0.5rem)] object-cover object-center"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
