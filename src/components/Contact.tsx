import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { site, socials } from "@/data/site";
import { Reveal } from "./Reveal";
import { Button } from "./ui/button";

export function Contact() {
  return (
    <section id="contact" className="relative px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-[var(--radius-card)] px-8 py-16 text-center sm:px-16 sm:py-24">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full blur-[100px]"
              style={{ background: "var(--glow-a)" }}
            />

            <p className="text-mono-label mb-5">Let's talk</p>
            <h2 className="mx-auto max-w-2xl text-balance text-4xl leading-[1.05] sm:text-6xl">
              Have a role or an idea worth building?
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-lg text-muted-foreground">
              I'm open to Data Science &amp; ML opportunities and the occasional
              good problem. The fastest way to reach me is email.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg">
                <a href={`mailto:${site.email}`}>
                  <Mail className="size-4" />
                  {site.email}
                </a>
              </Button>
            </div>

            <div className="mt-8 flex items-center justify-center gap-5 text-sm text-muted-foreground">
              {socials.map(({ label, href, icon: Icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  className="group inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
                >
                  <Icon className="size-4" />
                  {label}
                  <ArrowUpRight className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
                </motion.a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
