export type Course = {
  code: string;
  name: string;
  /** Grade for graduate courses, or language/tool for undergrad. */
  meta: string;
};

export type School = {
  institution: string;
  degree: string;
  detail: string;
  courses: Course[];
};

export const schools: School[] = [
  {
    institution: "Georgia Institute of Technology",
    degree: "M.S. Computer Science — Artificial Intelligence",
    detail: "2022 – 2026 · GPA 3.9 / 4.0",
    courses: [
      { code: "CS 6601", name: "Artificial Intelligence", meta: "A" },
      { code: "CS 7643", name: "Deep Learning", meta: "A" },
      { code: "CS 7641", name: "Machine Learning", meta: "B" },
      { code: "CS 6476", name: "Computer Vision", meta: "A" },
      { code: "CS 6603", name: "AI, Ethics & Society", meta: "A" },
      { code: "CS 7280", name: "Network Science", meta: "A" },
      { code: "CS 7646", name: "Machine Learning for Trading", meta: "A" },
      { code: "CS 6300", name: "Software Development Process", meta: "A" },
      { code: "CS 6250", name: "Computer Networks", meta: "A" },
      { code: "CS 6035", name: "Introduction to Information Security", meta: "A" },
    ],
  },
  {
    institution: "Singapore Management University",
    degree: "B.Sc. Economics (Data Science & Analytics) — Cum Laude",
    detail: "2018 – 2022 · Foundations in DS&A, ML, and AI across R and Python",
    courses: [
      { code: "CS 421", name: "Introduction to Machine Learning", meta: "Python" },
      { code: "DSA 212", name: "Data Science with R", meta: "R" },
      { code: "DSA 301", name: "Time Series Data Analysis", meta: "R" },
      { code: "DSA 302", name: "Financial Data Analysis", meta: "R" },
      { code: "DSA 303", name: "Spatial Data Analysis", meta: "R" },
      { code: "DSA 306", name: "Big Data Analytics", meta: "R" },
      { code: "IS 105", name: "Business Data Management", meta: "SQL" },
      { code: "IS 111", name: "Introduction to Programming", meta: "Python" },
      { code: "COR-IS 1702", name: "Computational Thinking", meta: "Python" },
    ],
  },
];

export const skills: string[] = [
  "Python",
  "PyTorch",
  "TensorFlow",
  "Scikit-learn",
  "Pandas",
  "NumPy",
  "Generative AI",
  "LangChain",
  "vLLM",
  "Llama.cpp",
  "Ollama",
  "RAG",
  "NLP",
  "Computer Vision",
  "Vector Search",
  "Elasticsearch",
  "SQL",
  "Postgres",
  "MongoDB",
  "Spark",
  "AWS",
  "GCP",
  "Azure",
  "Kubernetes",
  "Airflow",
  "FastAPI",
  "Streamlit",
  "Svelte",
  "Claude Code",
];
