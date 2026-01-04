
export interface Student {
  id: string;
  name: string;
  email: string;
  avatar: string;
  year: number;
  branch: string;
  bio: string;
  gender: 'Male' | 'Female' | 'Other';
  skills: string[]; // Technical/Programming Skills
  hobbies?: string[];
  sports?: string[];
  achievements: string[];
  projects: Project[];
  socials: {
    github?: string;
    linkedin?: string;
    portfolio?: string;
  };
  badges: string[];
  quizScore: number;
  isMock?: boolean;
}

export interface AlumniProject {
  title: string;
  description: string;
  role: string;
  year: string;
}

export interface Alumni {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  company: string;
  batch: number; // Passout Year
  branch: string;
  domain: string; // e.g., AI/ML, Core, Management
  experience: number; // Years
  cgpa: number;
  location: string;
  bio: string;
  collegeThoughts: string;
  projects: AlumniProject[];
  socials: {
    linkedin?: string;
    facebook?: string;
    twitter?: string;
  };
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  link?: string;
}

export interface CollaborationPost {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  title: string;
  description: string;
  type: 'Hackathon' | 'Project' | 'Competition' | 'Research';
  requiredSkills: string[];
  postedAt: string;
  openRoles: number;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number; // Index of correct option
  difficulty?: 'Easy' | 'Medium' | 'Hard';
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
}

export interface SearchFilters {
  skills?: string[];
  year?: number;
  branch?: string;
  query?: string;
  minScore?: number;
}

export enum AnalyticsType {
  SKILLS_DISTRIBUTION = 'SKILLS_DISTRIBUTION',
  YEAR_DISTRIBUTION = 'YEAR_DISTRIBUTION'
}
