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
      "Migrated legacy scripts and Excel-macro jobs into Python pipelines orchestrated by Apache Airflow on Kubernetes, improving reliability and maintainability of daily jobs",
      "Built trade-volume and P&L agents that autonomously pull from Postgres and Outlook to generate insightful commentary",
      "Maintained business-critical production automation as operational requirements evolved",
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
      "Built a RAG chatbot POC from scratch — a multi-agent system automating data retrieval, filtering, visualization, and analysis",
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
      "Built a shipping-container-number OCR web app with a two-stage model at 98.8% mAP, exposed as an API to cut manual-entry error",
      "Extended a health-safety-equipment object-detection model with new classes and a demo web app",
      "Refactored a product's development branch for OS compatibility and optimized the object-detection pipeline's runtime",
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
      "Drove $100K in revenue building and maintaining the Flavor Wheel visualization — critical to retaining a major client",
      "Integrated vector search into a production database, cutting false positives by 70% while improving query efficiency and precision",
      "Shipped Stable Diffusion XL image generation as a scalable API into a proof-of-concept solution",
      "Deployed ML models end-to-end as containerized, scalable APIs on GCP and Kubernetes, predicting user demographics from social-media data",
      "Built in-house web applications that streamlined and transformed internal workflows",
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
      "Tailored custom analytics to precisely meet and exceed client specifications",
      "Cut noise in unstructured text data with adept regex techniques, curtailing false positives",
      "Championed a sunburst-chart visualization adopted by multiple clients",
      "Maintained pipelines and built Python automation for logic validation and sophisticated data wrangling",
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
