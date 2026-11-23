// Shared data layer — single source of truth for all content across the site

export type Project = {
  number: string
  title: string
  category: string
  role: string
  stack: string[]
  liveUrl: string | null
  problem: string
  solution: string
  outcome: string | null
  badge: string | null
  accentFrom: string
  accentTo: string
}

export type Skill = {
  name: string
  icon: string // simple-icons slug, e.g. "react", "python"
}

export type SkillCategory = {
  label: string
  skills: Skill[]
}

export type ValuePrinciple = {
  number: string // "01" | "02" | "03"
  title: string
  body: string // 2–3 sentence elaboration
}

export type AISpecialisation = {
  title: string
  descriptor: string
}

export type EducationMilestone = {
  institution: string
  credential: string
  yearRange: string
}

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

export const projects: Project[] = [
  {
    number: '01',
    title: 'Cedar-Learn',
    category: 'EdTech',
    role: 'Full-Stack Engineer · Solo',
    stack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
    liveUrl: 'https://cedar-learn.onrender.com',
    problem:
      "Techpro Institute needed a real learning platform for its MERN stack and Scratch programming classes, not another generic course-hosting tool. Most off-the-shelf LMS platforms are either bloated with features an instructor-led bootcamp doesn't need, or too rigid to adapt to a curriculum that mixes live teaching with self-paced modules.",
    solution:
      'A production-grade LMS from the ground up, schema to deployment. Designed the data model in Prisma, built the course and progress-tracking system, shipped a UI focused on the actual daily workflow of an instructor running structured cohorts.',
    outcome: 'Actively used by 20 students across current Techpro Institute classes.',
    badge: null,
    accentFrom: '#1e1b4b',
    accentTo: '#0B0B18',
  },
  {
    number: '02',
    title: 'IṢẸ́',
    category: 'AI / Voice Systems',
    role: 'AI Engineer · Solo · Hackathon',
    stack: ['FastAPI', 'OpenAI Whisper', 'ChromaDB', 'Gemini 2.5 Flash'],
    liveUrl: null,
    problem:
      "Voice AI assistants overwhelmingly default to English, locking out the majority of everyday users across Nigeria who are far more comfortable speaking Yoruba, Hausa, Igbo, or Pidgin. IṢẸ́ set out to close that gap directly on WhatsApp — the platform most Nigerians already use daily.",
    solution:
      "A multilingual WhatsApp voice AI with a working webhook and a loaded knowledge base, using Whisper for transcription, ChromaDB for retrieval, and Gemini 2.5 Flash for generation — built and demoed within the hackathon's timeframe.",
    outcome:
      'A real challenge worth naming: Whisper struggled with tonal Yoruba and Igbo words — a genuine open problem in multilingual voice AI, not a solved one.',
    badge: 'Artificial Future Hackathon 2026',
    accentFrom: '#451a03',
    accentTo: '#0B0B18',
  },
  {
    number: '03',
    title: 'QwikCare',
    category: 'HealthTech',
    role: 'Product Pitch & Launch Lead · Team',
    stack: ['Product Strategy', 'Publicity', 'Product Presentation', 'User Onboarding'],
    liveUrl: 'https://qwikcare.org',
    problem:
      "Nigeria's healthcare system runs on a severely strained doctor-to-patient ratio, and over 70 million Nigerians spend more than 40% of their income on healthcare. QwikCare was built to bridge the gap between patients, doctors, nurses, and pharmacies.",
    solution:
      'Led product publicity, market positioning, and live launch presentations — representing the platform at OSDLS 2.0 (Osun State Digital Literacy Summit 2026) and driving early user and stakeholder awareness.',
    outcome:
      'Successfully pitched at OSDLS 2.0, supporting early onboarding of 40+ verified healthcare professionals and 500 patient users.',
    badge: 'OSDLS 2.0 — Pitched',
    accentFrom: '#052e16',
    accentTo: '#0B0B18',
  },
      
  {
    number: '04',
    title: 'Kaytop',
    category: 'FinTech',
    role: 'Frontend Developer · Team',
    stack: ['Next.js'],
    liveUrl: 'https://kaytop.online',
    problem:
      'Microfinance platforms need to serve very different users under one roof — everyday customers managing loans and savings, and internal staff who need clear operational control. Getting both right in one system is a real interface design challenge.',
    solution:
      "Designed and built the System Admin and HQ Manager dashboards, plus the platform's authentication pages, as part of the frontend team.",
    outcome: null,
    badge: null,
    accentFrom: '#172554',
    accentTo: '#0B0B18',
  },
  {
    number: '05',
    title: 'Kopamart',
    category: 'Marketplace',
    role: 'Frontend Developer · Team',
    stack: ['React'],
    liveUrl: 'https://kopamart.com',
    problem:
      'Kopamart was built to address the real struggles NYSC corps members face: little to no business visibility, financial insufficiency, expensive accommodation, and a lack of networking and job information.',
    solution: 'Built general UI components used across the app as part of the frontend team.',
    outcome: '800+ users.',
    badge: null,
    accentFrom: '#2e1065',
    accentTo: '#0B0B18',
  },
]

// ---------------------------------------------------------------------------
// Skills
// ---------------------------------------------------------------------------

export const skillCategories: SkillCategory[] = [
  {
    label: 'Languages',
    skills: [
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'Python', icon: 'python' },
      { name: 'PHP', icon: 'php' },
      { name: 'Dart', icon: 'dart' },
      { name: 'Kotlin', icon: 'kotlin' },
    ],
  },
  {
    label: 'Frontend',
    skills: [
      { name: 'React', icon: 'react' },
      { name: 'Next.js', icon: 'nextdotjs' },
      { name: 'Tailwind CSS', icon: 'tailwindcss' },
      { name: 'HTML5', icon: 'html5' },
      { name: 'CSS3', icon: 'css' },
      { name: 'Bootstrap', icon: 'bootstrap' },
    ],
  },
  {
    label: 'Backend',
    skills: [
      { name: 'Node.js', icon: 'nodedotjs' },
      { name: 'Express', icon: 'express' },
      { name: 'NestJS', icon: 'nestjs' },
      { name: 'Django', icon: 'django' },
      { name: 'Django REST Framework', icon: 'django' },
      { name: 'FastAPI', icon: 'fastapi' },
      { name: 'Laravel', icon: 'laravel' },
      { name: 'Flask', icon: 'flask' },
      { name: 'RESTful APIs', icon: 'openapiinitiative' },
      { name: 'Prisma', icon: 'prisma' },
    ],
  },
  {
    label: 'Databases',
    skills: [
      { name: 'PostgreSQL', icon: 'postgresql' },
      { name: 'MySQL', icon: 'mysql' },
      { name: 'MongoDB', icon: 'mongodb' },
      { name: 'Redis', icon: 'redis' },
      { name: 'Firebase', icon: 'firebase' },
      { name: 'Supabase', icon: 'supabase' },
    ],
  },
  {
    label: 'AI & ML',
    skills: [
      { name: 'LangGraph', icon: 'langchain' },
      { name: 'LangChain', icon: 'langchain' },
      { name: 'ChromaDB', icon: 'databricks' },
      { name: 'pgvector', icon: 'postgresql' },
      { name: 'Gemini API', icon: 'googlegemini' },
      { name: 'OpenAI Whisper', icon: 'openai' },
      { name: 'RAG Pipelines', icon: 'huggingface' },
      { name: 'TensorFlow', icon: 'tensorflow' },
      { name: 'n8n', icon: 'n8n' },
      { name: 'Zapier', icon: 'zapier' },
    ],
  },
  {
    label: 'Mobile',
    skills: [
      { name: 'React Native', icon: 'react' },
      { name: 'Flutter', icon: 'flutter' },
    ],
  },
  {
    label: 'Cloud & DevOps',
    skills: [
      { name: 'AWS', icon: 'amazonaws' },
      { name: 'Google Cloud', icon: 'googlecloud' },
      { name: 'Microsoft Azure', icon: 'azure' },
      { name: 'Docker', icon: 'docker' },
      { name: 'Vercel', icon: 'vercel' },
      { name: 'Git', icon: 'git' },
      { name: 'GitHub', icon: 'github' },
      { name: 'CI/CD', icon: 'githubactions' },
    ],
  },
]

// ---------------------------------------------------------------------------
// Values
// ---------------------------------------------------------------------------

export const valuePrinciples: ValuePrinciple[] = [
  {
    number: '01',
    title: 'Ship real things',
    body: "Side projects are tools; production deployments are the proof. Cedar's work is measured by products used by real people, not by repositories.",
  },
  {
    number: '02',
    title: 'Teach to deepen',
    body: 'Teaching through Cedar-Learn cohorts and at Techpro Institute is not a side activity — it forces rigour, exposes gaps, and sharpens every engineering decision made in production.',
  },
  {
    number: '03',
    title: 'Build for context',
    body: 'Technology choices are made in the context of Nigeria and West Africa — bandwidth constraints, local payment rails, multilingual users — not copied from Silicon Valley defaults.',
  },
]

// ---------------------------------------------------------------------------
// AI Specialisations
// ---------------------------------------------------------------------------

export const aiSpecialisations: AISpecialisation[] = [
  {
    title: 'RAG Pipeline Design',
    descriptor:
      'Designing retrieval-augmented generation systems that connect LLMs to domain-specific knowledge bases.',
  },
  {
    title: 'Agentic Systems with LangGraph',
    descriptor: 'Building multi-step AI agents with stateful graph workflows using LangGraph.',
  },
  {
    title: 'Voice AI (Whisper)',
    descriptor: 'Integrating OpenAI Whisper for speech-to-text in multilingual voice assistants.',
  },
  {
    title: 'Multilingual NLP',
    descriptor: 'Handling tonal African languages (Yoruba, Hausa, Igbo, Pidgin) in NLP pipelines.',
  },
  {
    title: 'WhatsApp AI Integrations',
    descriptor: 'Shipping conversational AI directly into WhatsApp via webhook and messaging APIs.',
  },
  {
    title: 'Vector Database Management',
    descriptor: 'Managing embeddings and similarity search with ChromaDB and pgvector.',
  },
]

// ---------------------------------------------------------------------------
// Education
// ---------------------------------------------------------------------------

export const educationMilestones: EducationMilestone[] = [
  {
    institution: 'Self-Directed Study',
    credential: 'Full-Stack Web Development',
    yearRange: '2017 — 2019',
  },
  {
    institution: 'Techpro Institute',
    credential: 'Advanced JavaScript & MERN Stack',
    yearRange: '2020 — 2021',
  },
  {
    institution: 'Cedar Creatives Practice',
    credential: 'AI Engineering (LangGraph, RAG, Voice AI)',
    yearRange: '2022 — Present',
  },
]
