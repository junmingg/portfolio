import surfaceVideo from "@/assets/media/surface.mp4";
import surfacePoster from "@/assets/media/surface.jpg";
import liquorVideo from "@/assets/media/liquor.mp4";
import liquorPoster from "@/assets/media/liquor.jpg";
import signVideo from "@/assets/media/signlanguage.mp4";
import signPoster from "@/assets/media/signlanguage.jpg";
import policyVideo from "@/assets/media/policy.mp4";
import policyPoster from "@/assets/media/policy.jpg";
import awsquiz from "@/assets/media/awsquiz.jpg";
import kan from "@/assets/media/kan.jpg";
import text2sql from "@/assets/media/text2sql.png";
import mcpPostgresVideo from "@/assets/media/mcp-postgres.mp4";
import mcpPostgresPoster from "@/assets/media/mcp-postgres.jpg";

export type ProjectCategory =
  | "Generative AI"
  | "Finance"
  | "Operations"
  | "Computer Vision"
  | "Web";

export type Project = {
  title: string;
  year: string;
  category: ProjectCategory;
  context: string;
  /** One-line headline result / what makes it notable. */
  highlight: string;
  bullets: string[];
  tech: string[];
  /** Still image — also serves as the poster when a video is present. */
  image: string;
  /** Optional looping preview clip. */
  video?: string;
  href: string;
};

export const projects: Project[] = [
  {
    title: "Postgres MCP Server + Recommender System",
    year: "2026",
    category: "Generative AI",
    context: "Personal project",
    highlight:
      "An MCP server that gives any Claude client read-only SQL analytics and ML recommendations over one e-commerce Postgres database.",
    bullets: [
      "Built a Model Context Protocol server (FastMCP) exposing analytics tools, an ALS recommender, a schema resource, and a prompt",
      "Three-layer read-only safety: a SELECT-only DB role, read-only transactions, and a sqlglot parser allowlist (unit-tested)",
      "ALS collaborative filtering on ~398K UCI Online Retail transactions, evaluated leave-last-out (recall@10 ≈ 0.11 over 4.2K users)",
      "Drives analytics, a recommendation, and a refused DROP in one Claude session — same data, two capabilities",
    ],
    tech: ["MCP", "Python", "Postgres", "implicit / ALS", "Docker"],
    video: mcpPostgresVideo,
    image: mcpPostgresPoster,
    href: "https://github.com/junmingg/recommendation-system-mcp-postgres",
  },
  {
    title: "Fine-Tuning Qwen2.5-Coder-7B for Text-to-SQL",
    year: "2026",
    category: "Generative AI",
    context: "Personal project",
    highlight:
      "QLoRA fine-tune that took Qwen2.5-Coder-7B from 4% to 79% exact-match on text-to-SQL — on a single RTX 3090.",
    bullets: [
      "QLoRA fine-tuned Qwen2.5-Coder-7B on 25k schema→SQL pairs with completion-only loss (1 epoch, ~1h on one RTX 3090)",
      "Lifted exact-match +75 pts (4%→79%) and independent-LLM-judged semantic equivalence +19 pts (67%→86%), validity >99%",
      "Built a leakage-checked eval harness (canonical exact-match, sqlglot validity, independent judge) plus a label-noise ablation",
      "Merged, quantized to GGUF (Q4_K_M/Q6_K/Q8_0), and published the model to Hugging Face",
    ],
    tech: ["PyTorch", "Unsloth", "QLoRA", "TRL", "Hugging Face"],
    image: text2sql,
    href: "https://github.com/junmingg/Unsloth-Qwen2.5-Coder-7b-Text-to-SQL-SFT",
  },
  {
    title: "AWS Cloud Practitioner Practice Quiz",
    year: "2025",
    category: "Web",
    context: "Personal project",
    highlight: "Turned a community question bank into a 23-exam practice platform.",
    bullets: [
      "Converted an open-source GitHub question bank into an interactive front-end quiz",
      "23 practice exams with search, status filtering, sorting, and per-exam progress tracking",
      "Tracks best scores, attempts, and weak areas to build exam readiness",
    ],
    tech: ["SvelteKit", "Tailwind", "Vercel"],
    image: awsquiz,
    href: "https://aws-cloud-practitioner-quiz-webapp-2m1ew48if-junminggs-projects.vercel.app/",
  },
  {
    title: "Kolmogorov-Arnold Networks for Time-Series Forecasting",
    year: "2024",
    category: "Finance",
    context: "School project",
    highlight:
      "Benchmarked KANs against MLP/RNN/LSTM for S&P 500 volatility forecasting.",
    bullets: [
      "Evaluated Temporal and Multivariate-Temporal KANs against MLP, RNN, and LSTM baselines",
      "Forecast S&P 500 realized volatility from 15+ FRED macro indicators across 1-day, 1-week, and 1-month horizons",
      "Implemented the models and fixed a critical pruning-order bug in the pykan library",
      "Found KANs interpretable but ~100× slower to train, with surprising parameter inefficiency in practice",
    ],
    tech: ["Python", "PyTorch", "KAN", "Time Series"],
    image: kan,
    href: `${import.meta.env.BASE_URL}kan-time-series-forecasting.pdf`,
  },
  {
    title: "Forecasting Yield Curves for Zero-Coupon Bonds",
    year: "2020",
    category: "Finance",
    context: "School project",
    highlight: "Modeled & visualized 8,000+ yield curves as a 3D surface.",
    bullets: [
      "Derived forward and spot rates from raw bond prices",
      "Fitted curves with the Nelson-Siegel and Nelson-Siegel-Svensson models",
      "Forecasted future curves with ARIMA modeling",
    ],
    tech: ["R", "ARIMA", "Time Series"],
    video: surfaceVideo,
    image: surfacePoster,
    href: "https://jmchen.notion.site/Estimating-and-Forecasting-Yield-Curves-for-Zero-Coupon-Bonds-33cfb594de8149d88017e934caf181a0",
  },
  {
    title: "Optimising Liquor Store Operations",
    year: "2020",
    category: "Operations",
    context: "School project",
    highlight:
      "Demand, manpower, and price optimization on real US store data.",
    bullets: [
      "Forecasted demand across product categories",
      "Built a manpower allocation model",
      "Developed a price optimization model",
    ],
    tech: ["Excel", "Optimization", "Forecasting"],
    video: liquorVideo,
    image: liquorPoster,
    href: "https://jmchen.notion.site/Optimising-Liquor-Store-Operations-a458d9d639964efea15b60a291819f60",
  },
  {
    title: "Sign Language to Speech",
    year: "2021",
    category: "Computer Vision",
    context: "School project",
    highlight: "Real-time hand-sign recognition spoken aloud via TTS.",
    bullets: [
      "Used MediaPipe Hands to plot 21 3D landmarks per hand",
      "Trained a VGG-16 convolutional neural network for classification",
      "Voiced predictions with Google Text-to-Speech",
    ],
    tech: ["Python", "VGG-16", "MediaPipe", "CNN"],
    video: signVideo,
    image: signPoster,
    href: "https://jmchen.notion.site/Sign-Language-to-Speech-45fbe6574cf44689be9755169a7b5596",
  },
  {
    title: "Policy Aggregator",
    year: "2021",
    category: "Web",
    context: "GovTech CodeFiesta Hackathon",
    highlight: "Hackathon build surfacing recent policy changes in one feed.",
    bullets: [
      "Aggregated and surfaced the most recent policy changes",
      "Web-scraped Wikipedia and compiled changes into a database",
    ],
    tech: ["Python", "Vue.js", "JavaScript", "HTML"],
    video: policyVideo,
    image: policyPoster,
    href: "https://jmchen.notion.site/Policy-Aggregator-GovTech-CodeFiesta-2021-89a80a9070974c7cbdf673f2460b206a",
  },
];

export const projectCategories: ProjectCategory[] = [
  "Generative AI",
  "Finance",
  "Operations",
  "Computer Vision",
  "Web",
];
