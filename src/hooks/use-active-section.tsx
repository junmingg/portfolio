import { useEffect, useState } from "react";

/**
 * Scroll-spy hook: observes the elements matching the given section ids and
 * returns the id of the section currently considered "active".
 *
 * Uses an IntersectionObserver with a rootMargin that offsets the top by the
 * fixed navbar height and pulls the bottom up, so a section becomes active once
 * it reaches roughly the upper third of the viewport. This keeps the active
 * state stable and avoids flicker between two adjacent sections.
 */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    if (typeof window === "undefined" || ids.length === 0) return;

    // Track how much of each section is visible so we can pick the best match.
    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }

        let best = "";
        let bestRatio = 0;
        for (const id of ids) {
          const ratio = ratios.get(id) ?? 0;
          if (ratio > bestRatio) {
            best = id;
            bestRatio = ratio;
          }
        }

        // At the very top nothing meaningful intersects — fall back to the first id.
        if (best) setActive(best);
        else if (window.scrollY < 8) setActive(ids[0] ?? "");
      },
      {
        // Offset the top by ~navbar height, and pull the bottom up so a section
        // activates when it's near the upper/middle of the viewport.
        rootMargin: "-88px 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join(",")]);

  return active;
}
