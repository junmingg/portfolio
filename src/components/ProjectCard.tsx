import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { Badge } from "./ui/badge";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.a
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
      {/* Media */}
      <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-foreground/[0.03]">
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
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <img
            src={project.image}
            alt={`${project.title} preview`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        )}
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="rounded-full bg-background/70 px-3 py-1 font-mono text-[0.68rem] tracking-wide text-foreground backdrop-blur-sm">
            {project.category}
          </span>
        </div>
        <div className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full bg-accent text-accent-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <ArrowUpRight className="size-4" />
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-2 flex items-center gap-2 font-mono text-xs text-muted-foreground">
          <span>{project.year}</span>
          <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
          <span>{project.context}</span>
        </div>

        <h3 className="text-xl leading-snug transition-colors group-hover:text-accent">
          {project.title}
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
    </motion.a>
  );
}
