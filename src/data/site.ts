import { Github, Linkedin } from "lucide-react";
import type { ComponentType } from "react";
import { MediumIcon } from "@/components/icons/MediumIcon";

export const site = {
  name: "Chen Jun Ming",
  brand: "<JunMing./>",
  role: "AI/ML Engineer",
  email: "chenjm246@gmail.com",
  resume: `${import.meta.env.BASE_URL}resume.pdf`,
  tagline:
    "AI/ML engineer building LLM-powered systems: RAG pipelines, multi-agent tools, and the data infrastructure behind them. I ship fast with agentic coding.",
  about: [
    "I'm an AI/ML engineer who builds production systems around machine learning and large language models. I pair solid ML fundamentals with modern tooling, and I'm happiest taking an ambiguous problem and turning it into something that ships.",
    "Right now I'm a Software Engineer at Modular Asset Management, building Python data pipelines on Airflow and Kubernetes plus autonomous agents that pull, reconcile, and comment on trading data. I lean heavily on agentic coding workflows like Claude Code to move fast without cutting corners. Before that I was a Senior AI Engineer at ST Engineering, where I built RAG chatbots and multi-agent systems, and a Data Scientist at Yokogawa and Ai Palette, working across computer-vision OCR, vector search, and generative AI.",
    "I recently finished a Master's in Computer Science (Artificial Intelligence) at Georgia Tech, taken alongside full-time work, on top of an Economics (Data Science & Analytics) degree from SMU. I started out in R and have lived in Python ever since.",
  ],
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
