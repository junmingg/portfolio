import { Github, Linkedin, type LucideIcon } from "lucide-react";

export const site = {
  name: "Chen Jun Ming",
  brand: "<JunMing./>",
  role: "AI/ML Engineer",
  email: "chenjm246@gmail.com",
  resume: "/resume.pdf",
  tagline:
    "AI/ML engineer building LLM-powered systems — RAG pipelines, multi-agent tools, and the data infrastructure behind them — and shipping fast with agentic coding.",
  about: [
    "I'm an AI/ML engineer who builds production systems around machine learning and large language models — pairing solid ML fundamentals with agentic coding tools like Claude Code to ship fast.",
    "Right now I'm a Software Engineer at Modular Asset Management, building Python data pipelines on Airflow and Kubernetes plus autonomous agents that pull, reconcile, and comment on trading data. Before that I was a Senior AI Engineer at ST Engineering — RAG chatbots and multi-agent systems — and a Data Scientist at Yokogawa and Ai Palette, working across computer-vision OCR, vector search, and generative AI.",
    "I recently finished a Master's in Computer Science (Artificial Intelligence) at Georgia Tech with a 3.9 GPA, taken alongside full-time work, on top of an Economics (Data Science & Analytics) degree from SMU. I started in R, live in Python now, and I'm happiest turning an ambiguous problem into something that ships.",
  ],
} as const;

export type SocialLink = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const socials: SocialLink[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jun-ming-chen/",
    icon: Linkedin,
  },
  { label: "GitHub", href: "https://github.com/junmingg", icon: Github },
];

export const navSections = [
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;
