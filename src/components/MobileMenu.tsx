import * as Dialog from "@radix-ui/react-dialog";
import { FileDown, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { navSections, site, socials } from "@/data/site";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

/**
 * The mobile nav drawer, split into its own chunk. It carries Radix's dialog
 * (~14 kB gzipped) which would otherwise sit in the entry chunk for the sake of
 * a control that only exists below the `md` breakpoint.
 */
export default function MobileMenu({
  open,
  onOpenChange,
  active,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  active: string;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
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
                {navSections.map((s) => {
                  const isActive = active === s.id;
                  return (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      onClick={() => onOpenChange(false)}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "rounded-xl px-3 py-3 font-serif text-xl transition-colors hover:text-accent",
                        isActive ? "text-accent" : "text-foreground"
                      )}
                    >
                      {s.label}
                    </a>
                  );
                })}
                <Button asChild size="lg" className="mt-auto tracking-wide">
                  <a
                    href={site.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => onOpenChange(false)}
                  >
                    Resume <FileDown className="size-4" />
                  </a>
                </Button>

                <div className="flex gap-2 pt-6">
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
  );
}
