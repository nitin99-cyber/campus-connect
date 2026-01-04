import { Student, CollaborationPost, Alumni } from '../types';

export const BRANCHES = [
  'Chemical Engineering',
  'Civil Engineering',
  'Computer Science and Engineering',
  'Electrical Engineering',
  'Electronics and Communication Engineering',
  'Electronics and Communication Engineering (IOT)',
  'Mechanical Engineering',
  'Information Technology'
];

export const SKILLS_POOL = [
  'React', 'Node.js', 'Python', 'Java', 'C', 'C++', 'Arduino', 'Raspberry Pi', 
  'Embedded Systems', 'Data Analysis', 'AWS', 'Figma', 'TypeScript', 'PostgreSQL', 
  'Machine Learning', 'Cybersecurity'
];

export const getRandomAvatar = (seed: string) => `https://picsum.photos/seed/${seed}/150/150`;

const generateMockStudents = (): Student[] => {
  const students: Student[] = [];
  let idCounter = 1;
  BRANCHES.forEach((branch) => {
    for (let i = 0; i < 5; i++) {
      students.push({
        id: `mock-${idCounter++}`,
        name: `Student ${idCounter}`,
        email: `student${idCounter}@example.com`,
        avatar: getRandomAvatar(`s-${idCounter}`),
        year: 1 + Math.floor(Math.random() * 4),
        branch: branch,
        bio: `Passionate ${branch} student.`,
        gender: 'Other',
        skills: [SKILLS_POOL[i % SKILLS_POOL.length]],
        achievements: [],
        projects: [],
        socials: {},
        badges: [],
        quizScore: 100,
        isMock: true
      });
    }
  });
  return students;
};

const NITIN_PROFILE: Student = {
  id: 'nitin-deep',
  name: 'Nitin Deep',
  email: 'nitincsemmmut@gmail.com',
  avatar: 'https://ui-avatars.com/api/?name=Nitin+Deep&background=2563EB&color=fff',
  year: 3,
  branch: 'Computer Science and Engineering',
  bio: 'Lead Creator of CampusConnect. Passionate about AI and full-stack development.',
  gender: 'Male',
  skills: ['React', 'TypeScript', 'Node.js', 'Firebase', 'Gemini AI'],
  achievements: ['CampusConnect Lead'],
  projects: [{ id: '1', title: 'CampusConnect', description: 'Student talent platform', techStack: ['React', 'Firebase'] }],
  socials: { github: 'https://github.com/nitin-deep' },
  badges: ['Architect'],
  quizScore: 999,
  isMock: false
};

export const MOCK_STUDENTS: Student[] = [NITIN_PROFILE, ...generateMockStudents()];

export const MOCK_ALUMNI: Alumni[] = [
  { 
    id: 'al-1', name: 'Vikram Singh', email: 'vikram@mmmut.ac.in', avatar: getRandomAvatar('al-1'), 
    role: 'Senior SDE', company: 'Google', batch: 2018, branch: 'CSE', domain: 'Software', 
    experience: 6, cgpa: 9.2, location: 'Bangalore', bio: "Google SDE", collegeThoughts: "Miss MMMUT",
    projects: [], socials: {}
  }
];

export const MOCK_POSTS: CollaborationPost[] = [];