# Data Schema

All generated React homepages should centralize personal content in one data object. This makes the page easy to customize and prevents copy from being scattered across components.

## TypeScript Profile Schema

```ts
export type Profile = {
  name: string;
  nickname?: string;
  title: string;
  tagline: string;
  location?: string;
  avatar?: string;
  availability?: string;
  bio: string[];
  highlights: Highlight[];
  skills: SkillGroup[];
  projects: Project[];
  experience: ExperienceItem[];
  content: ContentItem[];
  testimonials?: Testimonial[];
  links: ProfileLinks;
  qrCodes?: QrCodeLink[];
};

export type Highlight = {
  label: string;
  value: string;
  description?: string;
  isPlaceholder?: boolean;
};

export type SkillGroup = {
  category: string;
  capabilities: {
    name: string;
    description: string;
    tools?: string[];
    output?: string;
  }[];
};

export type Project = {
  name: string;
  summary: string;
  problem: string;
  role: string;
  features: string[];
  stack: string[];
  result?: string;
  link?: string;
  image?: string;
  imageAlt?: string;
  status?: string;
  isPlaceholder?: boolean;
};

export type ExperienceItem = {
  period: string;
  title: string;
  organization?: string;
  context?: string;
  owned: string;
  result?: string;
};

export type ContentItem = {
  title: string;
  platform: string;
  topic?: string;
  description: string;
  link?: string;
  metric?: string;
  isPlaceholder?: boolean;
};

export type Testimonial = {
  quote: string;
  name: string;
  role?: string;
  isPlaceholder?: boolean;
};

export type QrCodeLink = {
  platform: string;
  label: string;
  qrImage?: string;
  placeholderText?: string;
};

export type ProfileLinks = {
  email?: string;
  github?: string;
  x?: string;
  linkedin?: string;
  xiaohongshu?: string;
  zhihu?: string;
  wechatOfficial?: string;
  videoChannel?: string;
  bilibili?: string;
  website?: string;
  blog?: string;
  resume?: string;
  calendar?: string;
  wechatQr?: string;
};
```

## Minimal Example

```ts
export const profile: Profile = {
  name: "Alex Chen",
  nickname: "Alex",
  title: "AI Product Builder",
  tagline: "Building Agentic Search, Coding Agent workflows, and frontend demos that make AI usable.",
  location: "Replace with your city",
  availability: "Open to AI product, frontend, and agent collaboration",
  avatar: "",
  bio: [
    "I focus on Agentic Search, Coding Agents, and productizing AI workflows into usable frontend demos.",
    "My work connects product thinking, interface design, and LLM tool-use systems.",
    "I care about turning complex AI capabilities into experiences people can understand, test, and ship."
  ],
  highlights: [
    { value: "待补充", label: "project demos", description: "Replace with a real number when ready", isPlaceholder: true },
    { value: "待补充", label: "content reach", description: "Use only verified metrics", isPlaceholder: true }
  ],
  skills: [
    {
      category: "AI / LLM",
      capabilities: [
        {
          name: "Agent Workflow Design",
          description: "Designs tool-use flows, verifier loops, search augmentation, and human-in-the-loop review.",
          tools: ["LLM", "RAG", "Verifier", "Tool Calling"],
          output: "Search Agent / Coding Agent demos"
        }
      ]
    }
  ],
  projects: [
    {
      name: "Search Agent",
      summary: "An agentic search workflow for finding, verifying, and synthesizing information.",
      problem: "Normal search results are noisy and hard to verify.",
      role: "Product design, agent workflow, frontend demo",
      features: ["query planning", "source verification", "summary synthesis"],
      stack: ["React", "LLM", "Search API"],
      result: "待补充：demo link / usage result / benchmark",
      link: "",
      image: "",
      imageAlt: "Search Agent project screenshot placeholder",
      isPlaceholder: true
    }
  ],
  experience: [],
  content: [],
  links: {
    email: "replace@example.com",
    github: "",
    linkedin: "",
    website: ""
  }
};
```

## Copy Rules

- Do not invent real metrics.
- Do not invent links.
- Mark placeholders clearly.
- Keep personal content in `profile.ts` or equivalent.
- Components should render data, not define copy.
