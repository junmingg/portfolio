import portrait from "@/assets/GoogleTrailblazersPic.jpg";
import { site } from "@/data/site";
import { schools, skills, certifications } from "@/data/education";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { GlassCard } from "./GlassCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export function About() {
  return (
    <section id="about" className="relative px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <SectionHeading index="03" kicker="Background" title="About me" />

        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Portrait + skills */}
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <GlassCard className="overflow-hidden p-2">
                <img
                  src={portrait}
                  alt="Jun Ming presenting at Google for the AI Trailblazer Initiative"
                  className="aspect-[4/5] w-full rounded-[calc(var(--radius-card)-0.5rem)] object-cover object-left"
                />
              </GlassCard>

              <div className="mt-6">
                <p className="text-mono-label mb-3">Toolkit</p>
                <div className="flex flex-wrap gap-2">
                  {skills.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-border bg-foreground/[0.03] px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-accent/40 hover:text-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Prose + education */}
          <Reveal delay={0.1}>
            <div>
              <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
                {site.about.map((p) => (
                  <p key={p.slice(0, 24)} className="text-pretty">
                    {p}
                  </p>
                ))}
              </div>

              <div className="mt-10">
                <p className="text-mono-label mb-2">Education &amp; Coursework</p>
                <Accordion type="single" collapsible className="w-full">
                  {schools.map((school) => (
                    <AccordionItem
                      key={school.institution}
                      value={school.institution}
                    >
                      <AccordionTrigger>
                        <span className="flex flex-col text-left">
                          <span>{school.institution}</span>
                          <span className="font-sans text-sm font-normal text-muted-foreground">
                            {school.degree}
                          </span>
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-4 text-muted-foreground">
                          {school.detail}
                        </p>
                        <div className="grid gap-1.5">
                          {school.courses.map((c) => (
                            <div
                              key={c.code}
                              className="flex items-center justify-between gap-4 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-foreground/[0.03]"
                            >
                              <span className="flex items-center gap-3">
                                <span className="font-mono text-xs text-accent">
                                  {c.code}
                                </span>
                                <span className="text-foreground/80">
                                  {c.name}
                                </span>
                              </span>
                              <span className="font-mono text-xs text-muted-foreground">
                                {c.meta}
                              </span>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              <div className="mt-10">
                <p className="text-mono-label mb-3">Certifications</p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {certifications.map((cert) => (
                    <div
                      key={cert.name}
                      className="flex items-center gap-3 rounded-xl border border-border bg-foreground/[0.03] p-3 transition-colors hover:border-accent/40"
                    >
                      <img
                        src={cert.logo}
                        alt={`${cert.name} badge`}
                        className="h-10 w-10 shrink-0 object-contain"
                      />
                      <span className="flex flex-col">
                        <span className="text-sm font-medium leading-snug text-foreground">
                          {cert.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {cert.issuer}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
