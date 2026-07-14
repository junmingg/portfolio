import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const SPINNER = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
const MIN_MS = 900;

/**
 * A brief terminal-style boot overlay shown on page load: the claude-code mark
 * with a braille spinner, dismissed once fonts are ready (plus a short minimum
 * so it doesn't just flash). Skips the spin under reduced motion.
 */
export function LoadingScreen() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = React.useState(true);
  const [frame, setFrame] = React.useState(0);

  // Cycle the spinner frames.
  React.useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => setFrame((f) => (f + 1) % SPINNER.length), 80);
    return () => clearInterval(id);
  }, [reduceMotion]);

  // Dismiss once the page is ready, honoring a minimum on-screen time.
  React.useEffect(() => {
    const start = Date.now();
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      const wait = Math.max(0, MIN_MS - (Date.now() - start));
      setTimeout(() => setVisible(false), wait);
    };

    const fonts = document.fonts?.ready;
    if (fonts) {
      fonts.then(finish);
      // Safety net in case fonts.ready never settles.
      setTimeout(finish, 2500);
    } else {
      setTimeout(finish, MIN_MS);
    }
  }, []);

  return (
    <AnimatePresence>
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
