import surfaceVideo from "@/assets/media/surface.mp4";
import surfacePoster from "@/assets/media/surface.jpg";
import liquorVideo from "@/assets/media/liquor.mp4";
import liquorPoster from "@/assets/media/liquor.jpg";
import signVideo from "@/assets/media/signlanguage.mp4";
import signPoster from "@/assets/media/signlanguage.jpg";
import policyVideo from "@/assets/media/policy.mp4";
import policyPoster from "@/assets/media/policy.jpg";
import awsquiz from "@/assets/media/awsquiz.jpg";

export type ProjectCategory =
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
  "Finance",
  "Operations",
  "Computer Vision",
  "Web",
];
