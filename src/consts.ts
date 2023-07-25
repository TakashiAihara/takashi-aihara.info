// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

// Site Core Information
export const SITE_TITLE = "About TakashiAihara";
export const SITE_DESCRIPTION = "About TakashiAihara";
export const SITE_REPOSITORY_URL =
  "https://github.com/TakashiAihara/takashi-aihara.info";
export const ASTRO_REPOSITORY_URL = "https://github.com/withastro/astro";

// SEO
export const GA_ID = "G-HY8ZR2YW2P";

// SNS URLs
export const TWITTER_URL = "https://twitter.com/takashi__aihara";
export const GITHUB_URL = "https://github.com/TakashiAihara";
export const ZENN_URL = "https://zenn.dev/takashiaihara";
export const QIITA_URL = "https://qiita.com/TakashiAihara";

// SNS header consts
export const HEADER_SNS_SETTINGS = [
  {
    name: "GitHub",
    url: GITHUB_URL,
    icon: "simple-icons:github",
    color: "#181717",
  },
  {
    name: "Zenn",
    url: ZENN_URL,
    icon: "simple-icons:zenn",
    color: "#3EA8FF",
  },
  {
    name: "Qiita",
    url: QIITA_URL,
    icon: "simple-icons:qiita",
    color: "#55C500",
  },
  {
    name: "Twitter(X)",
    url: TWITTER_URL,
    icon: "bi:twitter",
    color: "#1DA1F2",
  },
];

export const HEADER_CONTENT_SETTINGS = [
  {
    name: "",
    alt: "Home",
    icon: "ant-design:home-outlined",
    activeIcon: "ant-design:home-filled",
  },
  {
    name: "bio",
    icon: "ph:person-light",
    activeIcon: "ph:person-fill",
  },
  {
    name: "skills",
    icon: "bi:gear",
    activeIcon: "bi:gear-fill",
  },
  {
    name: "portfolio",
    icon: "bi:folder",
    activeIcon: "bi:folder-fill",
  },
  {
    name: "blog",
    icon: "ph:book",
    activeIcon: "ph:book-fill",
  },
];

export const IT_CARRIER_SUMMARY_SETTINGS = [
  {
    summary: "Lead Web Developer (Tech Lead)",
    year: 2,
  },
  {
    summary: "Backend Engineer",
    year: 2,
  },
  {
    summary: "Frontend Engineer",
    year: 1,
  },
  {
    summary: "IT Research Analyst",
    year: 1,
  },
  {
    summary: "On-site Help Desk",
    year: 2,
  },
  {
    summary: "On-premises Infrastructure Engineer",
    year: 2,
  },
];

export const DANCER_CARRIER_SUMMARY_SETTINGS = [
  {
    summary: "Hiphop",
    year: 5,
  },
  {
    summary: "B-Boying",
    year: 4,
  },
];

export const BIO_SUMMARY_SETTINGS = [
  {
    content: "I am working as a freelance IT engineer",
    emoji: "🧑‍💻",
  },
  {
    content: "I also want to develop games",
    emoji: "🎮",
  },
  {
    content: "I also worked as an amateur dancer",
    emoji: "🕺",
  },
  {
    content: "I want to create fun things!",
    emoji: "✨",
  },
];

export const CONTENTS = ["bio", "skills", "portfolio", "blog"] as const;
