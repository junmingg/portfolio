import { Github, Linkedin } from "lucide-react";
import type { ComponentType } from "react";
import { MediumIcon } from "@/components/icons/MediumIcon";

export const site = {
  name: "Chen Jun Ming",
  brand: "<JunMing./>",
  role: "AI/ML Engineer",
  email: "contact@chenjunming.com",
  resume: `${import.meta.env.BASE_URL}resume.pdf`,
  tagline:
    "I am an AI/ML engineer building LLM-powered systems: RAG pipelines, multi-agent tools, and the data infrastructure behind them. I ship fast with agentic coding.",
  about: [
    "I'm an AI/ML engineer who builds production systems around machine learning and large language models. I pair solid ML fundamentals with modern tooling, and I'm happiest taking an ambiguous problem and turning it into something that ships.",
    "Right now I'm a Software Engineer at Modular Asset Management, building Python data pipelines on Airflow and Kubernetes plus autonomous agents that pull, reconcile, and comment on trading data. I lean heavily on agentic coding workflows like Claude Code to move fast without cutting corners. Before that I was a Senior AI Engineer at ST Engineering, where I built RAG chatbots and multi-agent systems, and a Data Scientist at Yokogawa and Ai Palette, working across computer-vision OCR, vector search, and generative AI.",
    "I recently finished a Master's in Computer Science (Artificial Intelligence) at Georgia Tech, taken alongside full-time work, on top of an Economics (Data Science & Analytics) degree from SMU. I started out in R and have lived in Python ever since.",
  ],
} as const;

/**
 * Playful "skills" manifest for the hero terminal, styled like an agent
 * harness. Distinct from the technical toolkit chips in education.ts.
 */
export const heroSkills: { name: string; description: string }[] = [
  {
    name: "builder",
    description: "Architect solutions end-to-end and build them out",
  },
  { name: "caffeine-ingestor", description: "Converts coffee into code" },
  {
    name: "lifelong-learner",
    description: "Keeping up to date with the latest trends in tech",
  },
];

/**
 * Contact form backend. Both values are public by design — the Worker URL is a
 * public endpoint guarded by an origin allow-list + Turnstile, and the site key
 * is meant to live in front-end code.
 */
export const contact = {
  workerUrl: "https://portfolio-contact-worker.chenjunming.workers.dev",
  turnstileSiteKey: "0x4AAAAAAD4fIHII8ksWmFsH",
} as const;

export type SocialLink = {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
};

export const socials: SocialLink[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jun-ming-chen/",
    icon: Linkedin,
  },
  { label: "GitHub", href: "https://github.com/junmingg", icon: Github },
  {
    label: "Medium",
    href: "https://medium.com/@junming-chen",
    icon: MediumIcon,
  },
];

export const navSections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;
