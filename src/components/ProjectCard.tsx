import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Maximize2, X } from "lucide-react";
import type { Project } from "@/data/projects";
import { Badge } from "./ui/badge";

export const ProjectCard = React.forwardRef<
  HTMLAnchorElement,
  { project: Project }
>(function ProjectCard({ project }, ref) {
  const [open, setOpen] = React.useState(false);
  const reduceMotion = useReducedMotion();

  const expand = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(true);
  };

  return (
    <motion.a
      ref={ref}
      layout
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
      whileHover={{ y: -6 }}
      className="glass group flex flex-col overflow-hidden rounded-[var(--radius-card)]"
    >
      {/* Media — the whole preview opens the lightbox (distinct from the card's outbound link) */}
      <div
        role="button"
        tabIndex={0}
        aria-label={`Expand ${project.title} preview`}
        onClick={expand}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") expand(e);
        }}
        className="group/media relative aspect-[16/10] cursor-zoom-in overflow-hidden border-b border-border bg-foreground/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
      >
        {project.video ? (
          <video
            src={project.video}
            poster={project.image}
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            aria-label={`${project.title} preview`}
            className="h-full w-full object-cover transition-transform duration-700 group-hover/media:scale-[1.04]"
          />
        ) : (
          <img
            src={project.image}
            alt={`${project.title} preview`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover/media:scale-[1.04]"
          />
        )}
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="rounded-full bg-background/70 px-3 py-1 font-mono text-[0.68rem] tracking-wide text-foreground backdrop-blur-sm">
            {project.category}
          </span>
        </div>

        {/* Hover scrim + expand hint — covers the full media, matching its click target */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background/35 opacity-0 backdrop-blur-[1px] transition-opacity duration-300 group-hover/media:opacity-100">
          <span className="inline-flex items-center gap-2 rounded-full bg-background/80 px-3 py-1.5 font-mono text-[0.68rem] tracking-wide text-foreground backdrop-blur-sm">
            <Maximize2 className="size-3.5" />
            Click to expand
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-2 flex items-center gap-2 font-mono text-xs text-muted-foreground">
          <span>{project.year}</span>
          <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
          <span>{project.context}</span>
        </div>

        <h3 className="flex items-start gap-1.5 text-xl leading-snug transition-colors group-hover:text-accent">
          <span>{project.title}</span>
          <ArrowUpRight className="mt-1 size-4 shrink-0 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
        </h3>

        <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
          {project.highlight}
        </p>

        <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
          {project.bullets.map((b) => (
            <li key={b} className="flex gap-2.5">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
              <span className="leading-relaxed">{b}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-1.5 pt-1">
          {project.tech.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      </div>

      {/* Lightbox — portaled to <body>, so it lives outside this anchor (valid HTML) */}
      <Dialog.Root open={open} onOpenChange={setOpen}>
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
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                  animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="glass fixed left-1/2 top-1/2 z-50 flex max-h-[90vh] w-[92vw] max-w-4xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-[var(--radius-card)]"
                >
                  <Dialog.Title className="sr-only">{project.title}</Dialog.Title>
                  <Dialog.Close
                    aria-label="Close preview"
                    className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/70 text-foreground backdrop-blur-sm transition-colors hover:text-accent"
                  >
                    <X className="size-5" />
                  </Dialog.Close>

                  <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto p-3 sm:p-6">
                    {project.video ? (
                      <video
                        src={project.video}
                        poster={project.image}
                        autoPlay
                        loop
                        muted
                        playsInline
                        aria-label={`${project.title} preview`}
                        className="max-h-[70vh] w-auto max-w-full object-contain"
                      />
                    ) : (
                      <img
                        src={project.image}
                        alt={`${project.title} preview`}
                        className="max-h-[70vh] w-auto max-w-full object-contain"
                      />
                    )}
                  </div>

                  <div className="border-t border-border p-5">
                    <p className="text-mono-label text-muted-foreground">
                      {project.category}
                    </p>
                    <h3 className="mt-1 text-lg leading-snug">{project.title}</h3>
                    <p className="mt-1 text-pretty text-sm leading-relaxed text-muted-foreground">
                      {project.highlight}
                    </p>
                  </div>
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </motion.a>
  );
});

ProjectCard.displayName = "ProjectCard";
