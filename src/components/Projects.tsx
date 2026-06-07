import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { projectCategories, projects } from "@/data/projects";
import { SectionHeading } from "./SectionHeading";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

type Filter = "All" | (typeof projectCategories)[number];

const filters: Filter[] = ["All", ...projectCategories];

export function Projects() {
  const [active, setActive] = useState<Filter>("All");

  const sorted = [...projects].sort(
    (a, b) => Number(b.year) - Number(a.year)
  );
  const visible =
    active === "All"
      ? sorted
      : sorted.filter((p) => p.category === active);

  return (
    <section id="projects" className="relative px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          index="01"
          kicker="Selected Work"
          title="Projects that sharpened the craft"
          description="A spread across finance, operations, computer vision, and web — each one a problem I wanted to solve end to end."
        />

        <Reveal>
          <div className="mb-10 flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm transition-colors",
                  active === f
                    ? "text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {active === f && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-accent"
                    transition={{ type: "spring", damping: 30, stiffness: 320 }}
                  />
                )}
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        <LayoutGroup>
          <motion.div layout className="grid gap-6 sm:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {visible.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  );
}
