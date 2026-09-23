/**
 * All editable site content lives here, separated from presentation.
 * Anything wrapped in [ADD ...] is a placeholder for real information
 * that has not been supplied yet — replace before publishing.
 */

export const profile = {
  name: 'Rachel Relox',
  title: 'AI Product Manager | Agile Delivery Leader',
  brandStatement: '22+ years turning ambiguous problems into shipped products.',
  supportingMessage:
    "Currently building AI-native tools at Cognizant, where I define outcomes, prioritize ruthlessly, and ship both AI-native products and AI-assisted automation that replaces manual processes.",
  location: 'Quezon City, Philippines',
  email: '[ADD EMAIL]',
  phone: '[ADD PHONE]',
  linkedin: 'https://www.linkedin.com/in/rachelrelox',
  github: 'https://github.com/rachelunboxed',
  resumeUrl: 'media/resume.pdf',
  availability: 'Building AI-native products at Cognizant',
};

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

export const hero = {
  eyebrow: 'AI PRODUCT MANAGEMENT • AGILE DELIVERY LEADERSHIP',
  headlineParts: [
    { text: 'Turning ', highlight: false },
    { text: 'ambiguous problems', highlight: true },
    { text: ' into ', highlight: false },
    { text: 'shipped products', highlight: true },
    { text: '.', highlight: false },
  ],
  paragraph:
    "22+ years turning ambiguous problems into shipped products. Currently building AI-native tools at Cognizant, where I define outcomes, prioritize ruthlessly, and build both AI-native products and AI-assisted automation that replaces manual processes.",
  primaryCta: { label: 'View Featured Projects', href: '#projects' },
  secondaryCta: { label: "Let's Connect", href: '#contact' },
};

export const trustStrip = [
  'AI Product Management',
  'Agile Delivery Leadership',
  'Spec-Driven Development',
  'AI-Assisted Automation',
  'Enterprise Program Delivery',
];

export const about = {
  title: 'A little about me',
  intro:
    "22+ years in software, from hands-on engineering to product ownership to AI product leadership.",
  narrative: [
    "I've spent 22+ years in software, moving from hands-on engineering and team leadership into product ownership.",
    "I've led towers on enterprise programs, driven zero-defect delivery recognized with a Project of the Year award, and most recently been named Cognizant's Circle of Excellence Manager of the Year (2025).",
    "Today I'm focused on AI product work: defining outcomes, prioritizing ruthlessly, and building both AI-native products and AI-assisted automation that replaces manual processes.",
  ],
  cards: [
    {
      title: 'Outcome-driven',
      description: 'Define the outcome first, then work backward to what actually needs to ship.',
    },
    {
      title: 'Builder mindset',
      description: "I don't just spec AI products. I build working POCs myself, end to end.",
    },
    {
      title: 'Delivery discipline',
      description: '22+ years of Agile leadership means ruthless prioritization, not scope creep.',
    },
  ],
  outsideOfWork: {
    label: 'Outside of work',
    text: 'Always learning. I like mentoring team members, refining delivery practices, and looking for the next manual process worth automating.',
  },
};

export type CareerStage = {
  id: string;
  order: string;
  title: string;
  company: string;
  dates: string;
  note?: string;
  focus: string[];
};

export const careerJourneyNote =
  "Official Cognizant title: Project Manager (Mar 2023), promoted to Senior Project Manager (Jul 2025). Titles below reflect client-engagement assignments.";

export const careerJourney: CareerStage[] = [
  {
    id: 'cogniverse',
    order: 'Experience 01',
    title: 'Product Owner',
    company: 'Cognizant, CogniVerse (Internal Innovation & Bench Management, Philippines, Hybrid)',
    dates: 'Feb 2026 – May 2026',
    note: 'Took an internal AI initiative from concept to a fully groomed, sprint-ready backlog, signed off the associate-engagement platform release, and delivered 3 proof-of-concept products for an internal AI showcase using Spec-Driven Development.',
    focus: ['AI product backlog ownership', 'Release sign-off', 'Spec-Driven Development POCs'],
  },
  {
    id: 'alaska-airlines',
    order: 'Experience 02',
    title: 'Lead Scrum Master & Product Owner',
    company: 'Cognizant, Alaska Airlines Account (Aviation, US-based, Remote)',
    dates: 'Nov 2023 – Feb 2026',
    note: 'Scaled Agile delivery from a single Scrum team to a 7-POD, 60+ engineer program. Along the way I coached 5-6 Scrum Masters, served as Proxy Product Manager during PI Planning, and helped shape a consumer app beta (Apple App Store, Google Play) and a Bank of America system integration.',
    focus: [
      'Led two towers',
      'Supervised 5-6 Scrum Masters',
      'Proxy Product Manager (PI Planning)',
      'Consumer app beta launch',
      'Bank of America integration',
    ],
  },
  {
    id: 'bdo',
    order: 'Experience 03',
    title: 'Delivery Manager',
    company: 'Cognizant, BDO Account (Banking & Insurance, Philippines, Hybrid)',
    dates: 'Mar 2023 – Sep 2023',
    note: "Hit 100% of scheduled release dates by coordinating audit-ready documentation across Release, DevOps, and QA, and by coordinating system integration and API delivery within BDO's API COE governance framework.",
    focus: ['Release management', 'API governance (COE)', 'Cross-team coordination'],
  },
  {
    id: 'cbre',
    order: 'Experience 04',
    title: 'Product Owner',
    company: 'Cognizant, CBRE Account (US-based, Remote)',
    dates: 'Aug 2022 – Dec 2022',
    note: "Owned product vision, roadmap, and backlog end to end for a zero-defect production release, recognized as Cognizant's Project of the Year (2022).",
    focus: ['Product ownership', 'Zero-defect delivery', 'Stakeholder workshops'],
  },
  {
    id: 'ensek',
    order: 'Experience 05',
    title: 'Scrum Master',
    company: 'Cognizant, ENSEK Account (UK-based, Remote)',
    dates: 'Feb 2022 – May 2022',
    note: 'Got 100% of the backlog ordered and sprint-ready by facilitating backlog refinement and negotiating MVP scope directly with the Scrum Team, BA, and Product Owner.',
    focus: ['Backlog refinement', 'MVP scope negotiation', 'Finance & payment extension'],
  },
  {
    id: 'ghl-systems',
    order: 'Experience 06',
    title: 'Software Development Manager',
    company: 'GHL Systems Berhad (FinTech)',
    dates: 'Nov 2021 – Feb 2022',
    note: 'Led 3 development teams to successful client UAT sign-off on a P2M application suite.',
    focus: ['Led 3 development teams', 'Client UAT sign-off', 'FinTech'],
  },
  {
    id: 'aig',
    order: 'Experience 07',
    title: 'Senior Application Team Lead & Senior Software Developer',
    company: 'AIG Shared Services (Insurance, US-based)',
    dates: 'Sep 2009 – Apr 2021',
    note: 'Moved a 7–9 person team from Waterfall to Agile; built proof-of-concept applications that shaped product roadmap decisions over a 9-year tenure.',
    focus: ['Waterfall-to-Agile transformation', 'Team leadership', 'Proof-of-concept development'],
  },
];

export const whatIBring = [
  {
    number: '01',
    title: 'Problem Solver',
    description: 'I enjoy breaking complex problems into practical, actionable solutions.',
  },
  {
    number: '02',
    title: 'Agile Mindset',
    description: 'I help teams collaborate, adapt, and continuously improve.',
  },
  {
    number: '03',
    title: 'Business + Technology',
    description: 'I connect business objectives with technology execution.',
  },
  {
    number: '04',
    title: 'People Focused',
    description: 'I believe successful delivery depends on strong communication and collaboration.',
  },
];

export const skillsAndTools = [
  'Azure DevOps',
  'Miro',
  'TestFlight',
  'Python (openpyxl)',
  'React Native',
  'Spec-Driven Development',
  'AI Product Prototyping',
  'AI-Assisted Process Automation',
];

export type CaseStudy = {
  id: string;
  index: string;
  category: string;
  title: string;
  problem?: string;
  role: string;
  highlights?: string[];
  summary?: string;
  outcome?: string;
  tools?: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    id: 'bench-status-management-system',
    index: 'Project 01',
    category: 'AI POC · Internal Talent Platform',
    title: 'Bench Status Management System',
    problem:
      'Weekly upskilling status was tracked through scattered individual Excel files, with no self-service way for associates to act on their own data.',
    role: 'Conceived and built the platform end to end using Spec-Driven Development.',
    highlights: [
      'Associates log their weekly upskilling status directly on the site, replacing Excel submissions',
      'Associates can apply for internal or external hiring opportunities matched to their own skillset',
      'Associates can propose community give-back initiatives, like brown bag sessions or training topics they want to lead',
      'Includes hobby communities associates can join',
      'Management can download the consolidated bench report and generate status reports anytime, on demand',
    ],
    outcome:
      'Turned a manual, Excel-driven reporting process into a self-service platform connecting associate development, internal mobility, and community engagement.',
    tools: ['Spec-Driven Development', 'Web App Development'],
  },
  {
    id: 'bench-weekly-status-consolidation',
    index: 'Project 02',
    category: 'AI-Assisted Automation',
    title: 'Bench Weekly Status Consolidation',
    problem:
      '60+ individual per-associate Excel status reports had to be manually consolidated into one bench report every week, a time-consuming, error-prone process.',
    role: 'Designed the prompt and processing logic, and built the automation using Python (openpyxl) driven by a Claude-based instruction set.',
    summary:
      'Standardizes inconsistent sheet naming, preserves exact decimal precision on hours data, deduplicates training records by associate/course/date, applies filtering and validation rules, and flags data quality issues automatically.',
    outcome:
      'Most recent run processed 64 associates and generated 190 training/initiative rows into a single standardized report, replacing a manual weekly task with a reliable automated pipeline.',
    tools: ['Claude', 'Python', 'openpyxl', 'Excel'],
  },
  {
    id: 'pipercare-plus',
    index: 'Project 03',
    category: 'AI Pet Health Management App',
    title: 'PiperCare+ (PawMD)',
    problem:
      'As a multi-pet owner, I kept forgetting to bring the physical vaccination booklet to vet visits and losing track of when each pet was last vaccinated.',
    role: 'Conceived and am building/pitching the product end to end, including the full pitch deck (problem, solution, AI features, architecture, data model, security, health score algorithm, subscription tiers, roadmap).',
    highlights: [
      'Multiple switchable pet profiles under one owner, each with type, breed, name, and history',
      'Tracks upcoming vet appointments and notifies on medicine times and visit days',
      'SOS button for emergencies: call your vet directly or locate the nearest one',
      "AI-assisted diagnostic scan for symptoms, flags whether a case is critical and needs a vet right away",
      "Scan feature to identify a pet's species and breed",
      'Diet logs',
    ],
    tools: [
      'React Native (Expo)',
      'TypeScript',
      'Zustand',
      'Express.js/Node.js',
      'MongoDB Atlas',
      'Google Gemini 2.5 Flash',
      'Google Places API',
    ],
  },
  {
    id: 'ai-powered-meal-planner',
    index: 'Project 04',
    category: 'AI Product',
    title: 'AI-Powered Meal Planner',
    problem: 'Meal planning needed to be personalized and low-effort, without giving up nutritional control.',
    role: 'Defined the product spec and built the POC end to end.',
    summary:
      'Suggests recipes tailored to diet needs, generates a full weekly menu from breakfast to dinner, builds an aggregated grocery list, and includes calorie counting with a tracker.',
    tools: ['React Native (Expo)', 'NativeWind', 'Zustand', 'AsyncStorage', 'Anthropic Claude API'],
  },
  {
    id: 'cogniverse',
    index: 'Project 05',
    category: 'Internal AI Platform',
    title: 'Cogniverse',
    role: "Product Manager for Cognizant's internal AI workforce and community platform.",
    summary: 'Defining roadmap and driving adoption of an internal AI initiative.',
  },
];

export const productProcess = [
  { stage: 'Discover', description: 'Understand the customer and business problem.' },
  { stage: 'Define', description: 'Translate insights into a clear problem statement.' },
  { stage: 'Prioritize', description: 'Focus on the work that creates the most value.' },
  { stage: 'Build', description: 'Collaborate with technology teams to deliver.' },
  { stage: 'Measure', description: 'Evaluate whether the solution achieved its intended outcome.' },
  { stage: 'Improve', description: 'Use feedback and data to continuously evolve the product.' },
];

export const aiSection = {
  title: 'Building AI-Native Products & Automation',
  label: 'AI Product Work',
  content:
    "I'm focused on AI product work: defining outcomes, prioritizing ruthlessly, and building both AI-native products and AI-assisted automation that replaces manual, error-prone processes.",
  cards: [
    { title: 'AI Product Management' },
    { title: 'AI-Native Product Design' },
    { title: 'AI-Assisted Process Automation' },
    { title: 'Spec-Driven Development' },
  ],
};

export type Certification = {
  id: string;
  name: string;
  provider: string;
  year: string;
};

export const certifications: Certification[] = [
  {
    id: 'safe-rte',
    name: 'AI-Empowered SAFe® Release Train Engineer (RTE) 6.0',
    provider: 'Scaled Agile, Inc.',
    year: '2026',
  },
  {
    id: 'safe-agilist',
    name: 'Certified AI-Empowered SAFe® Agilist',
    provider: 'Scaled Agile, Inc.',
    year: '2026 (renewed)',
  },
  {
    id: 'safe-ssm',
    name: 'Certified SAFe® 5 Scrum Master (SSM)',
    provider: 'Scaled Agile, Inc.',
    year: '2026 (renewed)',
  },
  {
    id: 'psm-1',
    name: 'Professional Scrum Master I (PSM I)',
    provider: 'Scrum.org',
    year: '2022',
  },
  {
    id: 'spoac',
    name: 'Scrum Product Owner Accredited Certification (SPOAC)',
    provider: 'International Scrum Institute',
    year: '2021',
  },
  {
    id: 'smac',
    name: 'Scrum Master Accredited Certification (SMAC)',
    provider: 'International Scrum Institute',
    year: '2021',
  },
  {
    id: 'sseac',
    name: 'Scaled Scrum Expert Accredited Certification (SSEAC)',
    provider: 'International Scrum Institute',
    year: '2021',
  },
];

export const philosophy = {
  quote: 'Great products happen when people, business goals, and technology work together.',
};

export const resumeCta = {
  headline: 'Looking for someone who can connect business, technology, and delivery?',
  supporting: "Let's connect and explore how my experience can contribute to your team.",
};

export const contact = {
  title: "Let's Connect",
  text: "I'm always open to conversations about AI product strategy, Agile delivery, or the projects above.",
};

export const footer = {
  tagline: '22+ years turning ambiguous problems into shipped products.',
  links: [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ],
};
