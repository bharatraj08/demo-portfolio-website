// Projects and their case studies. Each project gets its own page at /projects/<slug>/.
// To add one, copy an entry, give it a new slug, and describe its architecture diagram.

import type { Diagram } from "@/components/SystemDiagram";

export type Project = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  summary: string;
  role: string;
  highlights: string[];
  overview: string[];
  features: { title: string; body: string }[];
  stack: { group: string; items: string[] }[];
  infrastructure: string;
  diagram: Diagram;
  caption: string;
};

export const projects: Project[] = [
  {
    slug: "alertyz",
    name: "Alertyz",
    category: "Server monitoring",
    tagline: "Real-time server monitoring with a chatbot that answers questions about your infrastructure.",
    summary:
      "A one-command agent streams server metrics to a NestJS backend, a React dashboard charts health trends, and a RAG chatbot answers questions about the data in plain English.",
    role: "Full-stack development and AWS deployment",
    highlights: [
      "Agent installs on a server with one command",
      "Chatbot answers questions about server health",
      "Role-based access for multiple users",
    ],
    overview: [
      "Alertyz monitors servers in real time. A lightweight agent installs with a single command, collects CPU, memory, disk I/O, and network metrics, and streams them securely to a central backend.",
      "Teams follow health trends on a dashboard, get email alerts, and can ask a chatbot about their servers in plain English instead of digging through graphs.",
    ],
    features: [
      {
        title: "One-command agent",
        body: "A Node.js background service that installs with one command and streams real-time CPU, memory, disk I/O, and network metrics to the backend.",
      },
      {
        title: "Job pipeline built for load",
        body: "A NestJS backend with clean API design and BullMQ job handling that stores metrics in PostgreSQL and stays maintainable under high load.",
      },
      {
        title: "Health dashboard",
        body: "A React dashboard with dynamic graphs of server health trends, multi-user access, and role-based access control with hashed credentials.",
      },
      {
        title: "Chatbot over your metrics",
        body: "Retrieval-augmented generation with OpenAI APIs lets users ask natural-language questions about stored server health data.",
      },
      {
        title: "Alerts and deployment",
        body: "Email alerts through AWS SES, with the backend on EC2, PostgreSQL on RDS, and the frontend on Amplify for high availability and fault tolerance.",
      },
    ],
    stack: [
      { group: "Backend", items: ["Node.js", "NestJS", "BullMQ"] },
      { group: "Data", items: ["PostgreSQL"] },
      { group: "Frontend", items: ["React"] },
      { group: "AI", items: ["OpenAI APIs", "RAG"] },
      { group: "Cloud", items: ["AWS EC2", "AWS RDS", "AWS Amplify", "AWS SES"] },
    ],
    infrastructure: "AWS: EC2, RDS, Amplify, SES",
    caption:
      "Metrics flow from the agent through the API and job queue into PostgreSQL. The dashboard reads through the API, and the chatbot combines stored data with an OpenAI model.",
    diagram: {
      id: "alertyz",
      title: "Alertyz architecture",
      description:
        "A Node.js agent on each server sends metrics to a NestJS API on EC2, which queues jobs in BullMQ and stores results in PostgreSQL on RDS. The API sends email alerts with SES. A React dashboard on Amplify reads from the API and includes a RAG chatbot that reads PostgreSQL and calls OpenAI.",
      cols: 4,
      rows: 4,
      nodes: [
        { id: "ses", label: "Email alerts", sub: "AWS SES", col: 1, row: 0, kind: "service" },
        { id: "agent", label: "Server agent", sub: "Node.js service", col: 0, row: 1, kind: "client" },
        { id: "api", label: "NestJS API", sub: "AWS EC2", col: 1, row: 1, kind: "service" },
        { id: "queue", label: "BullMQ", sub: "Metric jobs", col: 2, row: 1, kind: "queue" },
        { id: "db", label: "PostgreSQL", sub: "AWS RDS", col: 3, row: 1, kind: "store" },
        { id: "dashboard", label: "React dashboard", sub: "AWS Amplify", col: 1, row: 2, kind: "service" },
        { id: "rag", label: "RAG chatbot", sub: "Plain-English questions", col: 2, row: 2, kind: "service" },
        { id: "openai", label: "OpenAI", sub: "Language model", col: 2, row: 3, kind: "service", external: true },
      ],
      edges: [
        { from: "agent", to: "api", label: "metrics", at: 0 },
        { from: "api", to: "queue", label: "jobs", at: 0.9 },
        { from: "queue", to: "db", at: 1.8 },
        { from: "api", to: "ses", label: "alerts", at: 1.8 },
        { from: "dashboard", to: "api", at: 2.7 },
        { from: "dashboard", to: "rag", label: "asks", at: 3.6 },
        { from: "rag", to: "db", label: "reads", fromSide: "right", toSide: "bottom", at: 4.5 },
        { from: "rag", to: "openai", at: 4.5 },
      ],
    },
  },
  {
    slug: "curiominds-ai",
    name: "Curiominds AI",
    category: "Education",
    tagline: "An AI learning platform where kids talk to voice tutors, track their progress, and create illustrated stories.",
    summary:
      "Subject-wise learning with progress tracking, real-time voice conversations with AI avatars, and a story generator that turns a child's prompt into an illustrated book.",
    role: "Full-stack development and AI integration",
    highlights: [
      "Real-time voice conversations with AI tutors",
      "Illustrated stories from a child's prompt",
      "Level-based English practice with AI buddies",
    ],
    overview: [
      "Curiominds AI is an interactive learning platform for kids. Children learn subject by subject with personalized progress tracking, talk to AI tutors in real time, and practice English on a gamified dashboard.",
      "A Story Book Generator lets them create their own illustrated stories, and Google Classroom integration brings it into schools.",
    ],
    features: [
      {
        title: "Learning platform",
        body: "Subject-wise learning with personalized progress tracking, built with Next.js, React, Node.js, Prisma, and PostgreSQL.",
      },
      {
        title: "Real-time voice tutors",
        body: "GPT-4o, Whisper, Deepgram, and ElevenLabs power voice conversations, speech-to-text, and lifelike AI avatars.",
      },
      {
        title: "Story Book Generator",
        body: "Children create visual stories from prompts and genres, with images generated by Stability AI.",
      },
      {
        title: "Gamified English learning",
        body: "A level-based dashboard with AI learning buddies that makes language practice fun and engaging.",
      },
      {
        title: "Classroom and partner integrations",
        body: "Google Classroom integration, plus SoulMachines, Vapi, and HeyGen for personalized AI teachers and multimodal content.",
      },
    ],
    stack: [
      { group: "Frontend", items: ["Next.js", "React"] },
      { group: "Backend", items: ["Node.js", "Prisma"] },
      { group: "Data", items: ["PostgreSQL"] },
      { group: "AI", items: ["GPT-4o", "Whisper", "Deepgram", "ElevenLabs", "Stability AI"] },
      { group: "Integrations", items: ["Google Classroom", "SoulMachines", "Vapi", "HeyGen"] },
    ],
    infrastructure: "Next.js app with a Node.js and PostgreSQL backend",
    caption:
      "The Next.js app connects three flows: learning data through the Node.js API, a voice loop from speech-to-text to GPT-4o to spoken avatars, and a story generator that illustrates with Stability AI.",
    diagram: {
      id: "curiominds",
      title: "Curiominds AI architecture",
      description:
        "Students use a Next.js app. Learning progress goes through a Node.js API with Prisma to PostgreSQL. Voice input is transcribed by Whisper and Deepgram, answered by GPT-4o, and spoken by ElevenLabs and HeyGen avatars. The story generator creates illustrations with Stability AI.",
      cols: 5,
      rows: 3,
      nodes: [
        { id: "kids", label: "Students", sub: "Web app", col: 0, row: 1, kind: "client" },
        { id: "app", label: "Next.js app", sub: "React", col: 1, row: 0, kind: "service", rowSpan: 3 },
        { id: "api", label: "Node.js API", sub: "Prisma", col: 2, row: 0, kind: "service" },
        { id: "db", label: "PostgreSQL", sub: "Progress data", col: 3, row: 0, kind: "store" },
        { id: "stt", label: "Speech to text", sub: "Whisper, Deepgram", col: 2, row: 1, kind: "service", external: true },
        { id: "gpt", label: "GPT-4o", sub: "Tutor replies", col: 3, row: 1, kind: "service", external: true },
        { id: "voice", label: "Voice and avatars", sub: "ElevenLabs, HeyGen", col: 4, row: 1, kind: "service", external: true },
        { id: "stories", label: "Story generator", sub: "Prompts and genres", col: 2, row: 2, kind: "service" },
        { id: "images", label: "Stability AI", sub: "Illustrations", col: 3, row: 2, kind: "service", external: true },
      ],
      edges: [
        { from: "kids", to: "app", at: 0 },
        { from: "app", to: "api", label: "progress", at: 0.9 },
        { from: "api", to: "db", at: 1.8 },
        { from: "app", to: "stt", label: "voice", at: 0.9 },
        { from: "stt", to: "gpt", at: 1.8 },
        { from: "gpt", to: "voice", at: 2.7 },
        { from: "app", to: "stories", label: "prompt", at: 0.9 },
        { from: "stories", to: "images", at: 1.8 },
      ],
    },
  },
  {
    slug: "lemon-ai",
    name: "Lemon AI",
    category: "AI search visibility",
    tagline: "A dashboard that shows how brands appear in AI answers from ChatGPT, Perplexity, and Google AI Overviews.",
    summary:
      "Weekly automated runs capture AI-generated answers, background pipelines score citations, sentiment, and rankings, and a Next.js dashboard charts brand visibility over time.",
    role: "Full-stack development and AWS deployment",
    highlights: [
      "Tracks ChatGPT, Perplexity, and Google AI Overviews",
      "Weekly automated capture on AWS Lambda",
      "Sentiment and ranking trends over time",
    ],
    overview: [
      "Lemon AI tracks how keywords and brands appear in answers from ChatGPT, Perplexity, and Google AI Overviews.",
      "Every week it captures and archives the AI-generated responses, scores them, and shows teams how their visibility, citations, and sentiment change over time.",
    ],
    features: [
      {
        title: "Automated weekly capture",
        body: "Scraping workflows with Puppeteer on AWS Lambda capture and archive AI-generated responses every week for historical trend and sentiment analysis.",
      },
      {
        title: "Scoring pipelines",
        body: "BullMQ and Redis process jobs asynchronously for link citation tracking, sentiment scoring, and brand ranking over time.",
      },
      {
        title: "Visibility dashboard",
        body: "Interactive charts built with Next.js, React, and Tailwind CSS show sentiment and ranking trends and brand mentions across AI platforms.",
      },
      {
        title: "Production infrastructure",
        body: "Deployed on AWS with EC2, Amplify, RDS, SQS, SES, and Docker, with CI/CD in GitHub Actions and a modular Turborepo monorepo.",
      },
    ],
    stack: [
      { group: "Frontend", items: ["Next.js", "React", "Tailwind CSS"] },
      { group: "Jobs", items: ["BullMQ", "Redis", "Puppeteer"] },
      { group: "Data", items: ["PostgreSQL"] },
      { group: "Cloud", items: ["AWS Lambda", "EC2", "RDS", "SQS", "SES", "Amplify", "Docker"] },
      { group: "Tooling", items: ["GitHub Actions", "Turborepo"] },
    ],
    infrastructure: "AWS: Lambda, EC2, RDS, SQS, SES, Amplify",
    caption:
      "A weekly schedule triggers Puppeteer on Lambda to ask AI platforms about each brand. Answers go through BullMQ pipelines for scoring, land in PostgreSQL, and feed the dashboard's trend charts.",
    diagram: {
      id: "lemon",
      title: "Lemon AI architecture",
      description:
        "A weekly schedule triggers a Puppeteer scraper on AWS Lambda, which sends prompts to ChatGPT, Perplexity, and Google AI Overviews. The answers go into BullMQ and Redis job pipelines, scoring workers compute citations, sentiment, and brand ranking, results are stored in PostgreSQL on RDS, and a Next.js dashboard on Amplify charts the trends.",
      cols: 4,
      rows: 2,
      nodes: [
        { id: "schedule", label: "Weekly schedule", sub: "Automated runs", col: 0, row: 0, kind: "client" },
        { id: "scraper", label: "Scraper", sub: "Puppeteer on Lambda", col: 1, row: 0, kind: "service" },
        { id: "engines", label: "AI answer engines", sub: ["ChatGPT, Perplexity,", "Google AI Overviews"], col: 1, row: 1, kind: "service", external: true },
        { id: "queue", label: "Job pipelines", sub: "BullMQ and Redis", col: 2, row: 0, kind: "queue" },
        { id: "workers", label: "Scoring workers", sub: ["Citations, sentiment,", "brand ranking"], col: 2, row: 1, kind: "service" },
        { id: "db", label: "PostgreSQL", sub: "AWS RDS", col: 3, row: 1, kind: "store" },
        { id: "dashboard", label: "Next.js dashboard", sub: "AWS Amplify", col: 3, row: 0, kind: "service" },
      ],
      edges: [
        { from: "schedule", to: "scraper", at: 0 },
        { from: "scraper", to: "engines", label: "prompts", at: 0.9 },
        { from: "scraper", to: "queue", label: "answers", at: 1.8 },
        { from: "queue", to: "workers", at: 2.7 },
        { from: "workers", to: "db", at: 3.6 },
        { from: "db", to: "dashboard", label: "trends", at: 4.5 },
      ],
    },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
