import { experiences } from "@/data/experience";
import { useTheme } from "@/hooks/use-theme";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

export function Experience() {
  const { theme } = useTheme();
  return (
    <section id="experience" className="relative px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          index="02"
          kicker="Track Record"
          title="Where I've shipped"
          description="From analytics internships to AI engineering — building ML systems, RAG tools, and the pipelines behind them across five companies."
        />

        <div className="relative">
          {/* Timeline spine */}
          <div className="absolute left-[7px] top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-accent/50 via-border to-transparent sm:block" />

          <div className="space-y-6">
            {experiences.map((exp, i) => (
              <Reveal key={`${exp.company}-${exp.role}`} delay={i * 0.05}>
                <div className="relative sm:pl-12">
                  <span className="absolute left-0 top-7 hidden size-[15px] rounded-full border-2 border-accent bg-background sm:block" />

                  <div className="glass rounded-[var(--radius-card)] p-6 sm:p-8">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                      <div
                        className={cn(
                          "flex h-20 w-32 shrink-0 items-center justify-center overflow-hidden rounded-xl border p-2.5",
                          "border-border bg-foreground/[0.03] dark:bg-white/[0.04]"
                        )}
                      >
                        <img
                          src={theme === "dark" ? exp.logoDark : exp.logoLight}
                          alt={`${exp.company} logo`}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <h3 className="text-xl">{exp.role}</h3>
                          <Badge>{exp.kind}</Badge>
                        </div>
                        <p className="mt-1 flex flex-wrap items-center gap-x-2 text-muted-foreground">
                          <span className="font-medium text-foreground/80">
                            {exp.company}
                          </span>
                          <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
                          <span className="font-mono text-sm">{exp.period}</span>
                        </p>

                        <ul className="mt-4 space-y-2 text-muted-foreground">
                          {exp.bullets.map((b) => (
                            <li key={b} className="flex gap-2.5">
                              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                              <span className="leading-relaxed">{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
