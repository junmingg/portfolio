import stenggLight from "@/assets/logos/stengg-light.png";
import stenggDark from "@/assets/logos/stengg-dark.png";
import modularLight from "@/assets/logos/modular-light.png";
import modularDark from "@/assets/logos/modular-dark.png";
import yokogawa from "@/assets/logos/yokogawa.png";
import aipLight from "@/assets/logos/aipalette-light.png";
import aipDark from "@/assets/logos/aipalette-dark.png";
import stb from "@/assets/logos/stb-light.png";

export type Experience = {
  company: string;
  role: string;
  period: string;
  /** Logo tuned for the light theme (dark/colored on light tile). */
  logoLight: string;
  /** Logo tuned for the dark theme (white/badge on dark tile). */
  logoDark: string;
  kind: "Full-time" | "Internship";
  bullets: string[];
};

export const experiences: Experience[] = [
  {
    company: "Modular Asset Management",
    role: "Software Engineer",
    period: "Feb 2026 — Present",
    logoLight: modularLight,
    logoDark: modularDark,
    kind: "Full-time",
    bullets: [
      "Fine-tuned and deployed an LLM with vLLM on an AKS GPU node — quantizing to INT8 (W8A8) with an INT8 KV cache on an A100, boosting throughput 40% over benchmark",
      "Re-architected legacy scripts and Excel macros into containerized Airflow pipelines on Kubernetes with monitoring and auto-recovery, cutting daily job failures ~80%",
      "Built trade-volume and P&L agents that pull from Postgres and Outlook, saving ~5 analyst-hours weekly",
      "Maintained ETL config and system mappings sustaining 99% uptime on daily business-as-usual operations",
    ],
  },
  {
    company: "ST Engineering",
    role: "Senior AI Engineer",
    period: "Apr 2025 — Feb 2026",
    logoLight: stenggLight,
    logoDark: stenggDark,
    kind: "Full-time",
    bullets: [
      "Architected a RAG chatbot from scratch — a multi-agent system automating retrieval, filtering, and analysis, cutting analyst data-retrieval time by 70%",
      "Raised NER model accuracy by 60% (50% → 80%) and added coreference resolution to de-duplicate entity references",
      "Deployed and secured a high-compliance, air-gapped stack (GitLab, Dataiku, Stable Diffusion) across enterprise servers and workstations",
    ],
  },
  {
    company: "Yokogawa Engineering Asia",
    role: "Data Scientist",
    period: "Aug 2024 — Apr 2025",
    logoLight: yokogawa,
    logoDark: yokogawa,
    kind: "Full-time",
    bullets: [
      "Built a two-stage shipping-container-number OCR model at 98.8% mAP, deployed as a production API that cut manual data-entry errors ~90%",
      "Extended a health-safety object-detection model to 15+ classes with a demo web app",
      "Refactored a product for OS compatibility and cut object-detection pipeline runtime ~30%, fixing a bug that made it 50–200% slower",
    ],
  },
  {
    company: "Ai Palette",
    role: "Data Scientist",
    period: "May 2022 — Apr 2024",
    logoLight: aipLight,
    logoDark: aipDark,
    kind: "Full-time",
    bullets: [
      "Owned the Flavor Wheel visualization end-to-end, driving $100K in revenue and retaining a flagship client",
      "Engineered vector search into a production database, sharpening query precision and reducing false positives by 85%",
      "Shipped Stable Diffusion XL image generation as a scalable API into a POC, accelerating creative content delivery by 75%",
      "Deployed an end-to-end ML model as a containerized API on Kubernetes, predicting user demographics from social-media data",
      "Built in-house web applications that streamlined internal workflows, improving operational efficiency ~30%",
      "Earned Google's Trailblazers Transformation Award, presenting demos to Google, the EDB, and MDDI (MCI)",
    ],
  },
  {
    company: "Ai Palette",
    role: "Data Science Intern",
    period: "Dec 2021 — Apr 2022",
    logoLight: aipLight,
    logoDark: aipDark,
    kind: "Internship",
    bullets: [
      "Delivered custom analytics tailored to client specifications, accelerating insight turnaround ~40%",
      "Automated logic validation and data wrangling in Python, cutting manual pipeline upkeep ~60%",
      "Cut noise in unstructured text with regex techniques, reducing false positives ~50%",
      "Championed a sunburst-chart visualization adopted by multiple clients",
    ],
  },
  {
    company: "Singapore Tourism Board",
    role: "Data Analytics Intern",
    period: "Jun 2020 — Aug 2020",
    logoLight: stb,
    logoDark: stb,
    kind: "Internship",
    bullets: [
      "Built data and predictive analytics in R, featured in the annual Travel Agents report",
      "Developed Microsoft Excel dashboards to visualize travel-agent data",
      "Designed an analytics capability-and-competency framework for existing systems",
      "Authored SOPs for data handling, wrangling, and predictive analytics across the department",
    ],
  },
];
