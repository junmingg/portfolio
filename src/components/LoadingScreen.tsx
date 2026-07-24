import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const SPINNER = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
// Always boot for at least this long so it never just flashes...
const MIN_MS = 2500;
// ...but never pin the overlay forever if fonts never settle (slow/offline).
const HARD_CAP_MS = 8000;

/**
 * A terminal-style boot overlay shown on page load: the claude-code mark with a
 * braille spinner. It stays up until the page is actually ready to paint — a
 * minimum on-screen time AND fonts loaded — so on slow networks it keeps
 * "booting…" rather than revealing a blank hero. Skips the spin under reduced
 * motion.
 */
export function LoadingScreen({ onDone }: { onDone?: () => void }) {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = React.useState(true);
  const [frame, setFrame] = React.useState(0);

  // Cycle the spinner frames.
  React.useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => setFrame((f) => (f + 1) % SPINNER.length), 80);
    return () => clearInterval(id);
  }, [reduceMotion]);

  // Dismiss once the page is genuinely ready to paint. Rather than firing off a
  // setTimeout (which a busy/slow mobile main thread can defer until the user
  // taps or scrolls), we poll on requestAnimationFrame: each frame checks
  // whether fonts have loaded and the minimum time has elapsed. Because the
  // decision to reveal happens *on a live render frame*, the hero's entrance
  // animation is guaranteed to run instead of stalling behind a queued timer.
  React.useEffect(() => {
    const start = performance.now();
    let raf = 0;
    let cancelled = false;
    let fontsReady = false;

    (document.fonts?.ready ?? Promise.resolve()).then(() => {
      fontsReady = true;
    });

    const tick = (now: number) => {
      if (cancelled) return;
      const elapsed = now - start;
      const ready = elapsed >= HARD_CAP_MS || (fontsReady && elapsed >= MIN_MS);
      if (ready) {
        setVisible(false);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    // Release the hero only once the overlay has fully faded out.
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-background font-mono"
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="text-accent">✻</span> claude-code
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="w-4 text-center text-accent">
              {reduceMotion ? "⠿" : SPINNER[frame]}
            </span>
            <span>booting session…</span>
            <span className="inline-block h-[1.05em] w-[0.5em] translate-y-[0.15em] animate-caret rounded-[1px] bg-accent" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
