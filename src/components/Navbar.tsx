import { Suspense, useEffect, useMemo, useState } from "react";
import { FileDown, Menu, RotateCw } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { navSections, site } from "@/data/site";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { ErrorBoundary } from "./ErrorBoundary";
import { lazyWithTimeout } from "@/lib/lazy-with-timeout";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";
import avatar from "@/assets/avatar.png";

const loadMobileMenu = () => import("./MobileMenu");

// Include "home" so nothing is highlighted at the top of the page.
const sectionIds = ["home", ...navSections.map((s) => s.id)];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // Stays true after the first open so the drawer's exit animation can play.
  const [menuMounted, setMenuMounted] = useState(false);
  // Set when the drawer's chunk fails. Swallowing that silently would leave the
  // only mobile nav control looking functional but doing nothing, with
  // aria-expanded stuck true against a drawer that will never appear.
  const [menuFailed, setMenuFailed] = useState(false);
  // Same reasoning as the page sections: lazy() caches its rejection, so a
  // retry needs a fresh instance or it just re-throws. A timed-out drawer that
  // was only slow should recover in place, not demand a reload.
  const [menuAttempt, setMenuAttempt] = useState(0);
  const MobileMenu = useMemo(() => lazyWithTimeout(loadMobileMenu), [menuAttempt]);
  const active = useActiveSection(sectionIds);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Warm the drawer chunk shortly after load on viewports that can actually
  // reach it, so the first tap opens immediately instead of waiting on a fetch.
  useEffect(() => {
    if (!window.matchMedia("(max-width: 767px)").matches) return;
    // Prefetch only — a failure here is not actionable, and an unhandled
    // rejection would surface as a console error for something the user never
    // asked for. The real attempt is guarded by the boundary below.
    const id = window.setTimeout(() => {
      import("./MobileMenu").catch(() => {});
    }, 1500);
    return () => clearTimeout(id);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={cn(
          "flex w-full max-w-5xl items-center justify-between rounded-full px-3 py-2 transition-all duration-500",
          scrolled ? "glass-strong pl-5" : "border border-transparent"
        )}
      >
        <a
          href="#home"
          aria-label={site.brand}
          className="group flex items-center gap-2 rounded-full py-1 pl-1 pr-2"
        >
          <img
            src={avatar}
            alt="Jun Ming Chen"
            className="h-7 w-7 shrink-0 rounded-full object-cover ring-1 ring-border"
          />
          {/* Rendered as a syntax-highlighted code tag so the mono reads as
              intentional: accent punctuation, foreground identifier. */}
          <span
            aria-hidden
            className="text-legible font-mono text-[0.95rem] font-medium tracking-tight"
          >
            <span className="text-accent/80">&lt;</span>
            <span className="text-foreground transition-colors group-hover:text-accent">
              JunMing.
            </span>
            <span className="text-accent/80">/&gt;</span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navSections.map((s) => {
            const isActive = active === s.id;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "text-legible relative rounded-full px-4 py-2 font-mono text-[0.8rem] tracking-wide transition-colors",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {isActive &&
                  (reduceMotion ? (
                    <span className="absolute inset-0 -z-10 rounded-full bg-foreground/[0.06]" />
                  ) : (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-foreground/[0.06]"
                      transition={{ type: "spring", damping: 30, stiffness: 320 }}
                    />
                  ))}
                {s.label}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <Button
            asChild
            size="sm"
            className="hidden tracking-wide md:mr-2 md:inline-flex"
          >
            <a href={site.resume} target="_blank" rel="noopener noreferrer">
              Resume <FileDown className="size-4" />
            </a>
          </Button>
          <ThemeToggle />

          {/* Mobile trigger — becomes a reload control if the drawer chunk
              fails, which is recoverable since the usual cause is a stale
              document asking for chunk names a redeploy replaced. */}
          <button
            aria-label={menuFailed ? "Menu failed to load — try again" : "Open menu"}
            aria-expanded={menuFailed ? undefined : open}
            onClick={() => {
              if (menuFailed) {
                setMenuFailed(false);
                setMenuAttempt((n) => n + 1);
              }
              setMenuMounted(true);
              setOpen(true);
            }}
            className="glass inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground md:hidden"
          >
            {menuFailed ? <RotateCw className="size-5" /> : <Menu className="size-5" />}
          </button>
          {menuMounted && (
            // Keyed on the attempt so a retry gets a *fresh* boundary. Without
            // this the instance stays latched at failed=true and keeps
            // rendering its null fallback, so the new lazy() instance built
            // above would never get a chance to mount — every later tap would
            // silently do nothing.
            <ErrorBoundary
              key={menuAttempt}
              fallback={null}
              onError={() => {
                setOpen(false);
                setMenuFailed(true);
              }}
            >
              <Suspense fallback={null}>
                <MobileMenu open={open} onOpenChange={setOpen} active={active} />
              </Suspense>
            </ErrorBoundary>
          )}
        </div>
      </nav>
    </motion.header>
  );
}
