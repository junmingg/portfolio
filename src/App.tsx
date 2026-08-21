import { Suspense, useEffect, useMemo, useState, type ComponentType } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Footer } from "./components/Footer";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { useBootScreen } from "./hooks/use-boot-screen";
import { lazyWithTimeout } from "./lib/lazy-with-timeout";

// Everything below the fold is split out of the initial chunk. These start
// fetching on first render — i.e. while the boot overlay is still up — so the
// download happens inside the wait the overlay was already imposing rather
// than before it. Radix (dialog/accordion) rides along in these chunks.
const sections: [string, () => Promise<{ default: ComponentType }>][] = [
  ["about", () => import("./components/About").then((m) => ({ default: m.About }))],
  ["experience", () => import("./components/Experience").then((m) => ({ default: m.Experience }))],
  ["projects", () => import("./components/Projects").then((m) => ({ default: m.Projects }))],
  ["contact", () => import("./components/Contact").then((m) => ({ default: m.Contact }))],
];

/**
 * Re-runs fragment navigation once the addressed section is actually on the
 * page.
 *
 * A pending section shell has zero height, so all four collapse to the same
 * spot just below the hero. A cold `/#contact` — or a navbar click while chunks
 * are still in flight — would otherwise land at whatever occupies that position
 * and stay there, since browsers do not repeat fragment scrolling when content
 * is inserted later. Rendering inside Suspense means this mounts only once the
 * sibling body has resolved.
 */
function SettleHash({ id }: { id: string }) {
  useEffect(() => {
    if (window.location.hash === `#${id}`) {
      document.getElementById(id)?.scrollIntoView();
    }
  }, [id]);
  return null;
}

/**
 * An always-mounted shell owning the section's `id`, wrapping a lazily loaded
 * body.
 *
 * The anchor lives outside both Suspense and the boundary: if it arrived with
 * the chunk, `#contact` on a cold load would find nothing and navbar links
 * would be inert while their section was in flight, or permanently if it
 * failed.
 *
 * One boundary per section, not one for all four — version skew after a
 * redeploy is not all-or-nothing, and a single dead chunk should not take out
 * Contact, which carries the direct-email fallback the other failure paths
 * point people at.
 */
function LazySection({
  id,
  load,
}: {
  id: string;
  load: () => Promise<{ default: ComponentType }>;
}) {
  // Bumping this builds a new lazy() instance. Necessary because lazy() caches
  // its rejection forever, so retrying the same one just re-throws — a chunk
  // that timed out at 10s but arrived at 10.1s would stay broken until reload.
  const [attempt, setAttempt] = useState(0);
  const Body = useMemo(() => lazyWithTimeout(load), [load, attempt]);

  return (
    <section id={id} className="relative scroll-mt-24">
      {/* Keyed on the attempt so a retry always gets a fresh boundary rather
          than relying on the instance resetting its own state. */}
      <ErrorBoundary key={attempt} onRetry={() => setAttempt((n) => n + 1)}>
        <Suspense fallback={null}>
          <Body />
          <SettleHash id={id} />
        </Suspense>
      </ErrorBoundary>
    </section>
  );
}

export default function App() {
  // Held false until the boot overlay finishes fading, so the hero's entrance
  // and terminal type-out play in full view rather than behind it.
  const ready = useBootScreen();

  return (
    <div className="relative">
      <Navbar />
      <main className="relative z-[2]">
        <Hero ready={ready} />
        {sections.map(([id, load]) => (
          <LazySection key={id} id={id} load={load} />
        ))}
      </main>
      <Footer />
    </div>
  );
}
