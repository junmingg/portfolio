import { lazy, type ComponentType } from "react";

export const IMPORT_TIMEOUT_MS = 10000;

/**
 * `lazy()` over an import bounded in time.
 *
 * A plain dynamic import settles only on success or on a network error. A
 * request that hangs — captive portal, filtering proxy, blocking extension —
 * leaves the promise pending forever, and a pending import is invisible to an
 * error boundary: Suspense just renders its fallback indefinitely. Rejecting on
 * a timeout converts that silence into a failure a boundary can act on.
 *
 * IMPORTANT: the timeout must never be the *last* word. `lazy()` caches its
 * rejection permanently, so a chunk that merely arrives late would otherwise
 * stay failed until a full page reload — turning a slow connection into a
 * broken one. Every caller must therefore be able to build a *fresh* instance
 * of this to retry with, which is why this is a factory rather than a module
 * constant.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- matches React's own lazy() constraint
export function lazyWithTimeout<T extends ComponentType<any>>(
  load: () => Promise<{ default: T }>
) {
  return lazy(
    () =>
      new Promise<{ default: T }>((resolve, reject) => {
        const timer = setTimeout(
          () => reject(new Error("Chunk request timed out")),
          IMPORT_TIMEOUT_MS
        );
        load().then(
          (mod) => {
            clearTimeout(timer);
            resolve(mod);
          },
          (err) => {
            clearTimeout(timer);
            reject(err);
          }
        );
      })
  );
}
