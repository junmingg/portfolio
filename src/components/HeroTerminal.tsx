import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { heroSkills } from "@/data/site";

/**
 * Reveals `text` one character at a time. When disabled (reduced motion),
 * the full text is shown immediately.
 */
function useTypewriter(
  text: string,
  enabled: boolean,
  speed = 16,
  startDelay = 700,
) {
  const [count, setCount] = React.useState(enabled ? 0 : text.length);

  React.useEffect(() => {
    if (!enabled) {
      setCount(text.length);
      return;
    }
    setCount(0);
    let charTimer: ReturnType<typeof setTimeout>;
    const startTimer = setTimeout(function tick() {
      setCount((c) => {
        const next = c + 1;
        if (next < text.length) charTimer = setTimeout(tick, speed);
        return next;
      });
    }, startDelay);
    return () => {
      clearTimeout(startTimer);
      clearTimeout(charTimer);
    };
  }, [text, enabled, speed, startDelay]);

  return count;
}

// ANSI Shadow figlet banner of the name. Rendered desktop-only and auto-scaled
// to the card width (container-query units) so it can never overflow.
const NAME_ART = [
  "     ██╗██╗   ██╗███╗   ██╗    ███╗   ███╗██╗███╗   ██╗ ██████╗ ",
  "     ██║██║   ██║████╗  ██║    ████╗ ████║██║████╗  ██║██╔════╝ ",
  "     ██║██║   ██║██╔██╗ ██║    ██╔████╔██║██║██╔██╗ ██║██║  ███╗",
  "██   ██║██║   ██║██║╚██╗██║    ██║╚██╔╝██║██║██║╚██╗██║██║   ██║",
  "╚█████╔╝╚██████╔╝██║ ╚████║    ██║ ╚═╝ ██║██║██║ ╚████║╚██████╔╝",
  " ╚════╝  ╚═════╝ ╚═╝  ╚═══╝    ╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝ ",
].join("\n");

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const line = {
  hidden: { opacity: 0, y: 6 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

/**
 * The hero tagline rendered as a Claude Code session: a boot sequence, the
 * tagline streaming in like an assistant response, a manifest of the real
 * stack, and a status bar. Styled in the site's warm glass system so it reads
 * as on-brand rather than a stock terminal.
 */
export function HeroTerminal({
  text,
  prompt = "describe yourself",
}: {
  text: string;
  prompt?: string;
}) {
  const reduceMotion = useReducedMotion();
  const count = useTypewriter(text, !reduceMotion);
  const typed = text.slice(0, count);
  const done = count >= text.length;

  // Full-time career began in 2022; keep years-of-experience current.
  const yoe = new Date().getFullYear() - 2022;

  return (
    <div className="glass overflow-hidden rounded-[var(--radius-card)] font-mono">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
        {/* Traffic lights, desaturated to sit in the warm palette rather than
            the raw neon macOS colors. */}
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-[#dd6b5d]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#e0a54c]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#7fa568]" />
        </span>
        <span className="ml-1 flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="text-accent">✻</span> claude-code
        </span>
      </div>

      {/* Body */}
      <motion.div
        variants={container}
        initial={reduceMotion ? "show" : "hidden"}
        animate="show"
        className="px-4 py-4 text-sm leading-relaxed sm:text-[0.95rem]"
      >
        {/* Name banner — auto-scaled with container-query units so it fits the
            card at any viewport, phones included. */}
        <motion.div variants={line} aria-hidden>
          <div style={{ containerType: "inline-size" }}>
            <pre
              className="leading-none text-accent/85"
              style={{
                fontSize: "clamp(0.3rem, 2.5cqw, 0.82rem)",
                lineHeight: 1.05,
              }}
            >
              {NAME_ART}
            </pre>
          </div>
          <p className="mt-2 text-[0.62rem] tracking-[0.34em] text-muted-foreground">
            <span className="text-accent">✻</span> AI / ML ENGINEER
          </p>
        </motion.div>
        <motion.p
          variants={line}
          className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground"
        >
          <span className="flex items-center gap-1.5">
            <span className="h-1 w-1 shrink-0 rounded-full bg-accent" />
            {yoe} yrs exp
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1 w-1 shrink-0 rounded-full bg-accent" />
            MSc Com Sci (AI), Georgia Tech
          </span>
        </motion.p>

        {/* Prompt */}
        <motion.p variants={line} className="mt-3 text-muted-foreground">
          <span className="text-accent">›</span> {prompt}
        </motion.p>

        {/* Full text for assistive tech (the animated copy below is hidden). */}
        <p className="sr-only">{text}</p>

        {/* Streaming response */}
        <motion.p
          variants={line}
          aria-hidden
          className="mt-1.5 text-pretty text-foreground/90"
        >
          {typed}
          <span
            className={cn(
              "ml-0.5 inline-block h-[1.05em] w-[0.5em] translate-y-[0.15em] rounded-[1px] bg-accent",
              done ? "animate-caret" : "opacity-100",
            )}
          />
        </motion.p>

        {/* Skills manifest — reveals once the response finishes typing */}
        <motion.div
          variants={container}
          initial={reduceMotion ? "show" : "hidden"}
          animate={done ? "show" : "hidden"}
          className="mt-4"
        >
          <motion.p variants={line} className="text-xs text-muted-foreground">
            ▾ skills ({heroSkills.length})
          </motion.p>
          {heroSkills.map((skill) => (
            <motion.p
              key={skill.name}
              variants={line}
              className="mt-1 flex items-start gap-3 text-xs"
            >
              <span className="w-36 shrink-0 text-accent">{skill.name}</span>
              <span className="text-muted-foreground">{skill.description}</span>
            </motion.p>
          ))}
        </motion.div>
      </motion.div>

      {/* Status bar */}
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-border px-4 py-2 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              done ? "bg-accent" : "bg-muted-foreground/40",
            )}
          />
          {done ? "ready" : "booting…"}
        </span>
        <span className="text-muted-foreground/40">│</span>
        <span>thinking: max</span>
        <span className="text-muted-foreground/40">│</span>
        <span>Singapore</span>
      </div>
    </div>
  );
}
