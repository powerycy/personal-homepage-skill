export type HomepageAssetRole =
  | 'portrait'
  | 'project-screenshot'
  | 'product-video'
  | 'artwork'
  | 'content-cover'
  | 'logo'
  | 'qr-code'
  | 'background';

export type HomepageAsset = {
  src: string;
  role: HomepageAssetRole;
  alt: string;
  width?: number;
  height?: number;
  dominantColors?: string[];
  usable: boolean;
  notes?: string;
};

export type HomepageProject = {
  title: string;
  problem: string;
  role: string;
  features: string[];
  stack: string[];
  result: string;
  image?: HomepageAsset;
  link?: string;
};

export type HomepageProfile = {
  name: string;
  nickname?: string;
  title: string;
  tagline: string;
  location?: string;
  availability?: string;
  bio: string;
  highlights: string[];
  skills: { group: string; items: string[] }[];
  projects: HomepageProject[];
  experience?: { period: string; role: string; organization: string; summary: string }[];
  content?: { title: string; platform: string; url?: string; cover?: HomepageAsset }[];
  links: { label: string; url: string }[];
  qrCodes?: HomepageAsset[];
  assets: HomepageAsset[];
};

// Generation rules for agents using this schema:
// - Do not invent metrics, employers, awards, links, or project results.
// - If a number/result is missing, write “待补充” or omit the metric rather than fabricating it.
// - Project cards should include problem, role, features, stack, result, and image alt text when an image exists.
// - Use relative paths for local assets in generated deliverables.
// - Long Chinese bios belong in readable body text, never in oversized display typography.
