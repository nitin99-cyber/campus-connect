
const STORAGE_KEY = 'campus_connect_site_content_v2';

export interface DeveloperInfo {
  name: string;
  role: string;
  email: string;
  quote: string;
  link: string; // Portfolio link
}

export interface SiteContent {
  ourStory: string;
  vision: string;
  careersText: string;
  developer: DeveloperInfo;
}

const DEFAULT_CONTENT: SiteContent = {
  ourStory: `CampusConnect started with a simple observation: our college was full of incredible talent, but students struggled to find each other. Hackathon teams were formed last minute, skilled developers worked in silos, and amazing project ideas died due to a lack of collaboration.

We set out to build a platform that serves as the digital heartbeat of our campus. More than just a directory, we wanted to create an ecosystem.`,
  vision: "To democratize opportunity within the campus walls and beyond. We envision a platform that supports multi-institution expansion using verified student identities, where trusted digital profiles focus on verified skills and achievements. By leveraging an AI-based dynamic matching algorithm, we connect students, professors, and alumni based on academic progress. Our vision includes a consent-governed engagement model that allows for controlled, skill-filtered interactions, ensuring a secure and professional environment for all members of the academic community.",
  careersText: "We are currently a small team of students. However, if you are passionate about React, AI, or Community Building, we'd love to hear from you for future roles.",
  developer: {
    name: "Nitin Deep",
    role: "Building and Learning new Tech",
    email: "nitincsemmmut@gmail.com",
    quote: "Crafting digital experiences with passion and caffeine.",
    link: "/team"
  }
};

export const AdminService = {
  getContent(): SiteContent {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? { ...DEFAULT_CONTENT, ...JSON.parse(stored) } : DEFAULT_CONTENT;
    } catch (e) {
      return DEFAULT_CONTENT;
    }
  },

  saveContent(content: SiteContent): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    // Dispatch a custom event so components can react to changes immediately if needed
    window.dispatchEvent(new Event('content-updated'));
  },

  resetContent(): void {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event('content-updated'));
  }
};
