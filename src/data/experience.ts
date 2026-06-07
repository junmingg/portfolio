import aip from "@/assets/AIP.jpg";
import stb from "@/assets/STB.png";
import yokogawa from "@/assets/logos/yokogawa.png";
import stengg from "@/assets/logos/stengg.png";
import modular from "@/assets/logos/modular.png";

export type Experience = {
  company: string;
  role: string;
  period: string;
  logo: string;
  /** Tile background — "dark" for light/knockout logos. */
  logoBg: "light" | "dark";
  kind: "Full-time" | "Internship";
  bullets: string[];
};

export const experiences: Experience[] = [
  {
    company: "Modular Asset Management",
    role: "Software Engineer",
    period: "Feb 2026 — Present",
    logo: modular,
    logoBg: "dark",
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
    logo: stengg,
    logoBg: "light",
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
    logo: yokogawa,
    logoBg: "light",
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
    logo: aip,
    logoBg: "light",
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
    logo: aip,
    logoBg: "light",
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
    logo: stb,
    logoBg: "light",
    kind: "Internship",
    bullets: [
      "Built data and predictive analytics in R, featured in the annual Travel Agents report",
      "Developed Microsoft Excel dashboards to visualize travel-agent data",
      "Designed an analytics capability-and-competency framework for existing systems",
      "Authored SOPs for data handling, wrangling, and predictive analytics across the department",
    ],
  },
];
