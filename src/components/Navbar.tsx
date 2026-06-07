import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { navSections, site, socials } from "@/data/site";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
          scrolled ? "glass pl-5" : "border border-transparent"
        )}
      >
        <a
          href="#home"
          className="rounded-full px-2 font-mono text-base font-medium tracking-tight text-foreground transition-colors hover:text-accent"
        >
          {site.brand}
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navSections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {s.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Mobile trigger */}
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <button
                aria-label="Open menu"
                className="glass inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground md:hidden"
              >
                <Menu className="size-5" />
              </button>
            </Dialog.Trigger>
            <AnimatePresence>
              {open && (
                <Dialog.Portal forceMount>
                  <Dialog.Overlay asChild forceMount>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm"
                    />
                  </Dialog.Overlay>
                  <Dialog.Content asChild forceMount>
                    <motion.div
                      initial={{ x: "100%" }}
                      animate={{ x: 0 }}
                      exit={{ x: "100%" }}
                      transition={{ type: "spring", damping: 30, stiffness: 280 }}
                      className="glass fixed inset-y-0 right-0 z-50 flex w-72 flex-col gap-2 rounded-l-[var(--radius-card)] p-6"
                    >
                      <Dialog.Title className="sr-only">Menu</Dialog.Title>
                      <div className="mb-6 flex items-center justify-between">
                        <span className="font-mono text-sm text-muted-foreground">
                          {site.brand}
                        </span>
                        <Dialog.Close
                          aria-label="Close menu"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:text-foreground"
                        >
                          <X className="size-5" />
                        </Dialog.Close>
                      </div>
                      {navSections.map((s) => (
                        <a
                          key={s.id}
                          href={`#${s.id}`}
                          onClick={() => setOpen(false)}
                          className="rounded-xl px-3 py-3 font-serif text-xl text-foreground transition-colors hover:text-accent"
                        >
                          {s.label}
                        </a>
                      ))}
                      <div className="mt-auto flex gap-2 pt-6">
                        {socials.map(({ label, href, icon: Icon }) => (
                          <a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={label}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-accent"
                          >
                            <Icon className="size-[18px]" />
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  </Dialog.Content>
                </Dialog.Portal>
              )}
            </AnimatePresence>
          </Dialog.Root>
        </div>
      </nav>
    </motion.header>
  );
}
