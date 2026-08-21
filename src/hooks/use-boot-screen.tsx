import * as React from "react";

// Always show the boot screen for at least this long so it reads as a
// deliberate beat rather than a flash...
const MIN_MS = 2500;
// ...but never pin it forever if the fonts never settle (slow/offline).
const HARD_CAP_MS = 8000;
const FADE_MS = 500;

/**
 * Drives the boot overlay that `index.html` has already painted.
 *
 * The overlay is static markup in the document head/body rather than a React
 * component, so it is on screen from the first byte — before this bundle has
 * even been fetched. That means the wait it imposes overlaps the download
 * instead of being tacked on after it.
 *
 * Timings are measured from `performance.now()`, i.e. from navigation start
 * rather than from React mount. So on a slow connection where the bundle took
 * four seconds to arrive, the minimum has already elapsed and the overlay
 * leaves as soon as the fonts are ready; the floor only ever binds on
 * connections that were fast enough not to need it.
 *
 * Returns true once the overlay has fully faded, so the hero can start its
 * entrance in clear view. Teardown itself belongs to `index.html`, which also
 * carries a failsafe timeout — if this bundle never runs, the overlay still
 * leaves rather than spinning forever.
 */
export function useBootScreen(): boolean {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    let raf = 0;
    let timer = 0;
    let cancelled = false;
    let fontsReady = false;

    (document.fonts?.ready ?? Promise.resolve()).then(() => {
      fontsReady = true;
    });

    const dismiss = () => {
      // The overlay tears itself down (see index.html) so that its exit does
      // not depend on this bundle having survived. All we do is say "now".
      window.__bootHide?.();
      timer = window.setTimeout(() => {
        if (!cancelled) setReady(true);
      }, FADE_MS);
    };

    // Poll on rAF rather than a setTimeout: a busy mobile main thread can defer
    // a queued timer until the user taps or scrolls, whereas deciding on a live
    // render frame guarantees the hero's entrance actually runs.
    const tick = (now: number) => {
      if (cancelled) return;
      if (now >= HARD_CAP_MS || (fontsReady && now >= MIN_MS)) {
        dismiss();
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, []);

  return ready;
}
