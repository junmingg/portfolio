import { useEffect, useState } from "react";

// Desktop-class pointing devices (mouse / trackpad) signal a machine that can
// comfortably composite the richer entrance — an opacity + blur fade layered
// over the glass surfaces. Touch devices (phones/tablets, iOS Safari in
// particular) choke on animating filter/opacity on top of `backdrop-filter`, so
// there we fall back to a transform-only slide.
const QUERY = "(pointer: fine) and (hover: hover)";

/**
 * True when the device is powerful enough for the full fade + blur entrance.
 * Reactive to hardware changes (e.g. plugging in a mouse) and SSR-safe.
 */
export function useRichMotion(): boolean {
  const [rich, setRich] = useState<boolean>(() =>
    typeof window !== "undefined" && "matchMedia" in window
      ? window.matchMedia(QUERY).matches
      : false
  );

  useEffect(() => {
    if (typeof window === "undefined" || !("matchMedia" in window)) return;
    const mq = window.matchMedia(QUERY);
    const onChange = () => setRich(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return rich;
}
