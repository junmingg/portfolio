import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, FileDown } from "lucide-react";
import { site, socials } from "@/data/site";
import { Button } from "./ui/button";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export function Hero() {
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
        animate="show"
        className="mx-auto w-full max-w-5xl"
      >
        <motion.p
          variants={item}
          className="text-mono-label mb-6 flex items-center gap-3"
        >
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-accent" />
          Open to AI / ML Engineering roles
        </motion.p>

        <motion.h1
          variants={item}
          className="max-w-4xl text-balance text-5xl leading-[1.02] sm:text-7xl lg:text-8xl"
        >
          {site.name}
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-5 font-mono text-base text-accent sm:text-lg"
        >
          {site.role}
        </motion.p>

        <motion.p
          variants={item}
          className="mt-5 max-w-2xl text-pretty text-xl leading-relaxed text-muted-foreground sm:text-2xl"
        >
          {site.tagline}
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <Button asChild size="lg">
            <a href="#projects">
              View Projects <ArrowDown className="size-4" />
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href={site.resume} target="_blank" rel="noopener noreferrer">
              Resume <FileDown className="size-4" />
            </a>
          </Button>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-10 flex items-center gap-4 text-sm text-muted-foreground"
        >
          {socials.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <Icon className="size-4" />
              <span>{label}</span>
              <ArrowUpRight className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
