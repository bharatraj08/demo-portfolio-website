// Everything personal on the site lives here. Edit this file to update the content;
// projects and their case studies live in content/projects.ts.

import type { Diagram } from "@/components/SystemDiagram";

export const profile = {
  name: "Bharat Raj",
  role: "Software Developer",
  location: "Ahmedabad, India",
  email: "bharatraj1918@gmail.com",
  github: "https://github.com/bharatraj08",
  linkedin: "https://www.linkedin.com/in/bharatraj1918",
  since: 2021,
  headline:
    "I build AI-powered products end to end: the backend, the LLM pipeline, the dashboard, and the cloud they run on.",
  intro:
    "Software developer at Creole Studios. I've been shipping production software with Node.js, NestJS, and Next.js since 2021, for teams in healthcare, education, tech, and services.",
  availability: "Available for freelance projects and full-time roles",
  // Used for search results and link previews
  description:
    "Bharat Raj is a software developer who builds AI-powered products end to end with Node.js, NestJS, Next.js, LangChain, and AWS. Available for freelance projects and full-time roles.",
};

export const about = [
  "I'm Bharat, a software developer in Ahmedabad, India. I studied Computer Engineering at SVIT, Vasad, and started my career in 2021 at Vrundaz Technology, building Node.js backends, MongoDB data models, and secure authentication.",
  "Since 2023 I've been at Creole Studios, where I own projects from requirements to production delivery. More and more of that work is AI: chatbots built with LangChain, RAG over company data, multi-LLM orchestration, and voice experiences, running on backends I design and deploy on AWS.",
  "I also mentor junior developers and do a lot of code review. With clients, I work directly with stakeholders from the first conversation through launch.",
];

// Where the site is published (the deploy workflow sets this automatically)
export const siteUrl =
  (process.env.NEXT_PUBLIC_SITE_URL || "https://bharatraj08.github.io/demo-portfolio-website").replace(/\/$/, "") + "/";

export const services = [
  {
    title: "AI features for real products",
    body: "Chatbots, assistants, summarizers, and voice experiences built on OpenAI and LangChain, with retrieval-augmented generation (RAG) over your own data.",
    tools: ["OpenAI APIs", "LangChain", "Pinecone", "Hugging Face", "Whisper", "ElevenLabs"],
    icon: "ai",
  },
  {
    title: "Backends that hold up under load",
    body: "Node.js and NestJS APIs with clear module boundaries, PostgreSQL and MongoDB data models, background jobs on BullMQ and Redis, and secure auth with JWT, OAuth2, and role-based access.",
    tools: ["Node.js", "NestJS", "PostgreSQL", "MongoDB", "BullMQ", "Redis"],
    icon: "backend",
  },
  {
    title: "Full-stack apps, deployed",
    body: "Next.js and React frontends and dashboards, shipped to AWS with Docker and CI/CD pipelines in GitHub Actions.",
    tools: ["Next.js", "React", "AWS", "Docker", "GitHub Actions"],
    icon: "cloud",
  },
] as const;

export const howIWork = [
  {
    title: "Understand",
    body: "We talk through your goals, users, and constraints until the requirements are clear enough to build.",
  },
  {
    title: "Design",
    body: "I propose the architecture, data model, and plan, and you review them before any code is written.",
  },
  {
    title: "Build",
    body: "I work in short iterations with demos and code reviews, so you can see progress as it happens.",
  },
  {
    title: "Ship",
    body: "I deploy to AWS with CI/CD and documentation, so your team can run and extend what we built.",
  },
];

export const experience = [
  {
    role: "Software Developer",
    company: "Creole Studios",
    location: "Ahmedabad, Gujarat",
    start: "Feb 2023",
    end: "Present",
    current: true,
    summary: "Full-stack and GenAI development for client products in healthcare, tech, and services.",
    highlights: [
      "Lead features end to end, from requirements gathering and solutioning to production delivery, working directly with clients and stakeholders.",
      "Build GenAI features with OpenAI APIs and LangChain, including chatbots, code assistants, and summarizers, and multi-LLM orchestration for enterprise applications.",
      "Architect full-stack applications from scratch with Node.js, NestJS, Next.js, and PostgreSQL, with CI/CD pipelines from day one.",
      "Deploy and run services on AWS (EC2, S3, Lambda, RDS) with Docker and GitHub Actions.",
      "Mentor junior developers, lead code reviews, and keep technical documentation current.",
    ],
  },
  {
    role: "Software Engineer",
    company: "Vrundaz Technology",
    location: "Vadodara, Gujarat",
    start: "Nov 2021",
    end: "Jan 2023",
    current: false,
    summary: "Backend development for data-heavy, real-time applications.",
    highlights: [
      "Designed MongoDB schemas, indexes, and aggregations for fast queries in real-time applications.",
      "Implemented authentication and authorization with JWT and OAuth2.",
      "Built report generation, file handling, and bulk processing modules with background jobs.",
      "Wrote reusable middleware for error handling, logging, request validation, and caching with Redis.",
    ],
  },
];

export const education = {
  degree: "B.E. in Computer Engineering",
  school: "SVIT, Vasad",
  location: "Anand, Gujarat",
  start: "2018",
  end: "2022",
};

// "Bill of materials": each tool and what it's used for
export const stack: { group: string; items: [string, string][] }[] = [
  {
    group: "AI and LLMs",
    items: [
      ["OpenAI APIs", "Chatbots, code assistants, summarizers, and RAG"],
      ["LangChain", "Agent-based orchestration for chatbots"],
      ["Pinecone", "Vector store for retrieval-augmented generation"],
      ["Hugging Face Transformers", "Open models and embeddings"],
      ["Serverless GenAI pipelines", "LLM workloads on AWS Lambda"],
      ["Prompt engineering", "Prompts designed for production use"],
    ],
  },
  {
    group: "Backend",
    items: [
      ["Node.js and TypeScript", "APIs, workers, and background services"],
      ["NestJS", "Modular APIs and job handling"],
      ["Express", "APIs and middleware"],
      ["BullMQ", "Queues and asynchronous job pipelines"],
      ["Puppeteer", "Automated browser workflows"],
      ["Python", "Backend development"],
    ],
  },
  {
    group: "Data",
    items: [
      ["PostgreSQL", "Primary relational database"],
      ["Prisma", "Type-safe database access"],
      ["MongoDB", "Schemas, indexes, and aggregations for real-time apps"],
      ["MySQL", "Relational databases"],
      ["Redis", "Caching and job queues"],
    ],
  },
  {
    group: "Frontend",
    items: [
      ["Next.js", "Full-stack apps and dashboards"],
      ["React", "Dashboards and data visualization"],
      ["Tailwind CSS", "Styling"],
    ],
  },
  {
    group: "Cloud and DevOps",
    items: [
      ["AWS", "EC2, Lambda, RDS, S3, SQS, SES, and Amplify"],
      ["Docker", "Containerized deployments"],
      ["GitHub Actions", "CI/CD pipelines"],
      ["Turborepo", "Monorepo builds"],
    ],
  },
  {
    group: "Ways of working",
    items: [
      ["Agile and Scrum", "Sprint planning, stand-ups, and retrospectives"],
      ["Technical documentation", "Docs teams can maintain"],
      ["Code reviews", "Quality and mentoring"],
      ["Client communication", "Direct contact from requirements to delivery"],
    ],
  },
];

export const glance: [string, string][] = [
  ["Based in", "Ahmedabad, India"],
  ["Currently", "Software Developer, Creole Studios"],
  ["Building since", "2021"],
  ["Focus", "Backend, GenAI, and AWS"],
  ["Education", "B.E. Computer Engineering, SVIT Vasad"],
  ["Open to", "Freelance projects and full-time roles"],
];

// The animated diagram in the hero: how a question moves through an AI feature
export const heroDiagram: Diagram = {
  id: "hero",
  title: "Architecture of an AI feature",
  description:
    "A user's question goes from the Next.js app to a NestJS API, which stores data in PostgreSQL and queues a job in BullMQ. An AI worker picks up the job, retrieves context from a Pinecone vector store, and prompts an OpenAI model.",
  cols: 4,
  rows: 3,
  nodes: [
    { id: "users", label: "Your users", sub: "Web and mobile", col: 0, row: 0, kind: "client" },
    { id: "app", label: "Next.js app", sub: "Frontend", col: 1, row: 0, kind: "service" },
    { id: "api", label: "NestJS API", sub: "Auth and logic", col: 2, row: 0, kind: "service" },
    { id: "db", label: "PostgreSQL", sub: "App data", col: 3, row: 0, kind: "store" },
    { id: "queue", label: "BullMQ", sub: "Job queue", col: 2, row: 1, kind: "queue" },
    { id: "worker", label: "AI worker", sub: "RAG pipeline", col: 2, row: 2, kind: "service" },
    { id: "vectors", label: "Pinecone", sub: "Vector search", col: 1, row: 2, kind: "store", external: true },
    { id: "llm", label: "OpenAI", sub: "Language model", col: 3, row: 2, kind: "service", external: true },
  ],
  edges: [
    { from: "users", to: "app", label: "question", at: 0 },
    { from: "app", to: "api", at: 0.9 },
    { from: "api", to: "db", at: 1.8 },
    { from: "api", to: "queue", label: "job", at: 1.8 },
    { from: "queue", to: "worker", at: 2.7 },
    { from: "worker", to: "vectors", label: "context", at: 3.6 },
    { from: "worker", to: "llm", label: "prompt", at: 4.5 },
  ],
};
