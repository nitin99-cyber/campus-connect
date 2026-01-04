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

const NAMES_MALE = ['Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Arjun', 'Sai', 'Reyansh', 'Ayan', 'Krishna', 'Ishaan', 'Shaurya', 'Atharva'];
const NAMES_FEMALE = ['Saanvi', 'Anya', 'Kiara', 'Diya', 'Pari', 'Ananya', 'Myra', 'Riya', 'Meera', 'Isha', 'Aditi', 'Kavya'];
const SURNAMES = ['Sharma', 'Verma', 'Gupta', 'Singh', 'Patel', 'Kumar', 'Mishra', 'Yadav', 'Reddy', 'Nair', 'Jain', 'Chopra'];

const HOBBIES_POOL = ['Photography', 'Music', 'Reading', 'Gaming', 'Cooking', 'Traveling', 'Sketching', 'Blogging'];
const SPORTS_POOL = ['Badminton', 'Cricket', 'Chess', 'Football', 'Basketball', 'Table Tennis', 'Volleyball'];

export const getRandomAvatar = (seed: string) => `https://picsum.photos/seed/${seed}/150/150`;

const generateMockStudents = (): Student[] => {
  const students: Student[] = [];
  let idCounter = 1;

  BRANCHES.forEach((branch) => {
    for (let i = 0; i < 5; i++) {
      const isFemale = Math.random() > 0.5;
      const firstName = isFemale 
        ? NAMES_FEMALE[Math.floor(Math.random() * NAMES_FEMALE.length)] 
        : NAMES_MALE[Math.floor(Math.random() * NAMES_MALE.length)];
      const lastName = SURNAMES[Math.floor(Math.random() * SURNAMES.length)];
      
      let branchSkills: string[] = [];
      if (branch.includes('Computer') || branch.includes('Information')) {
        branchSkills = ['React', 'Node.js', 'Python', 'Java', 'C++', 'AWS', 'Machine Learning'];
      } else if (branch.includes('Electronics') || branch.includes('Electrical')) {
        branchSkills = ['Arduino', 'Raspberry Pi', 'Embedded Systems', 'C', 'Python', 'IoT'];
      } else {
        branchSkills = ['Data Analysis', 'Python', 'AutoCAD', 'MATLAB', 'Project Management'];
      }

      const shuffledSkills = [...branchSkills, ...SKILLS_POOL].sort(() => 0.5 - Math.random());
      const uniqueSkills = Array.from(new Set(shuffledSkills)).slice(0, 3 + Math.floor(Math.random() * 3));
      const hobbies = [...HOBBIES_POOL].sort(() => 0.5 - Math.random()).slice(0, 1 + Math.floor(Math.random() * 2));
      const sport = Math.random() > 0.3 ? [SPORTS_POOL[Math.floor(Math.random() * SPORTS_POOL.length)]] : [];

      students.push({
        id: `mock-${idCounter++}`,
        name: `${firstName} ${lastName}`,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
        avatar: getRandomAvatar(`mock-${firstName}-${idCounter}`),
        year: 1 + Math.floor(Math.random() * 4),
        branch: branch,
        bio: `I am a passionate ${branch} student interested in ${uniqueSkills[0]} and ${uniqueSkills[1]}. Always ready to learn!`,
        gender: isFemale ? 'Female' : 'Male',
        skills: uniqueSkills,
        hobbies: hobbies,
        sports: sport,
        achievements: Math.random() > 0.7 ? ['Hackathon Participant', 'Class Representative'] : [],
        projects: [
          {
            id: `p-${idCounter}`,
            title: `${uniqueSkills[0]} Project`,
            description: `A project demonstrating my skills in ${uniqueSkills[0]}.`,
            techStack: [uniqueSkills[0], uniqueSkills[1] || 'Git']
          }
        ],
        socials: {
          linkedin: `linkedin.com/in/${firstName.toLowerCase()}${lastName.toLowerCase()}`,
          github: `github.com/${firstName.toLowerCase()}${lastName.toLowerCase()}`
        },
        badges: Math.random() > 0.8 ? ['Early Adopter'] : [],
        quizScore: 100 + Math.floor(Math.random() * 800),
        isMock: true
      });
    }
  });

  return students;
};

// Permanent Nitin Deep Profile
const NITIN_PROFILE: Student = {
  id: 'nitin-deep',
  name: 'Nitin Deep',
  email: 'nitincsemmmut@gmail.com',
  avatar: 'https://ui-avatars.com/api/?name=Nitin+Deep&background=2563EB&color=fff',
  year: 3,
  branch: 'Computer Science and Engineering',
  bio: 'Passionate developer and creator of CampusConnect. I love building tools that empower fellow students. Expert in modern web technologies and AI integration.',
  gender: 'Male',
  skills: ['React', 'TypeScript', 'Node.js', 'Firebase', 'Gemini AI', 'Tailwind CSS'],
  achievements: ['CampusConnect Lead Creator', 'Google Solution Challenge Participant'],
  projects: [
    {
      id: 'cc-main-001',
      title: 'CampusConnect',
      description: 'The digital backbone for college collaboration and talent showcase.',
      techStack: ['React', 'Vite', 'Firebase', 'Gemini API']
    }
  ],
  socials: { 
    github: 'https://github.com/nitin-deep', 
    linkedin: 'https://linkedin.com/in/nitin-deep' 
  },
  badges: ['Project Architect', 'VisionX Admin'],
  quizScore: 980,
  isMock: false
};

export const MOCK_STUDENTS: Student[] = [NITIN_PROFILE, ...generateMockStudents()];

export const MOCK_ALUMNI: Alumni[] = [
  { 
    id: 'al-1', 
    name: 'Vikram Singh', 
    email: 'vikram@mmmut.ac.in', 
    avatar: getRandomAvatar('al-1'), 
    role: 'Senior SDE', 
    company: 'Google', 
    batch: 2018, 
    branch: 'CSE', 
    domain: 'Software', 
    experience: 6, 
    cgpa: 9.2, 
    location: 'Bangalore', 
    bio: "Passionate about scalable distributed systems and cloud computing. I started my journey contributing to open source projects during my 2nd year.",
    collegeThoughts: "The coding culture at MMMUT defined my career. The late-night hackathons at the Computer Centre were where I learned true debugging.",
    projects: [
        { title: "Google Cloud Spanner", description: "Worked on optimizing query latency for high-throughput databases.", role: "Backend Lead", year: "2022-Present" },
        { title: "Distributed Cache System", description: "Built a custom caching layer for high-traffic microservices.", role: "Developer", year: "2020" }
    ],
    socials: { linkedin: '#', twitter: '#' } 
  },
  { 
    id: 'al-2', 
    name: 'Anjali Sharma', 
    email: 'anjali@mmmut.ac.in', 
    avatar: getRandomAvatar('al-2'), 
    role: 'Product Manager', 
    company: 'Microsoft', 
    batch: 2019, 
    branch: 'IT', 
    domain: 'Management', 
    experience: 5, 
    cgpa: 8.8, 
    location: 'Hyderabad', 
    bio: "Bridging the gap between engineering and user needs. I love solving complex user problems with simple, elegant solutions.",
    collegeThoughts: "Being part of the Editorial Board helped me articulate my thoughts, a skill crucial for Product Management.",
    projects: [
        { title: "MS Teams Integration", description: "Led the integration of 3rd party apps into Teams mobile.", role: "PM", year: "2023" }
    ],
    socials: { linkedin: '#' } 
  },
  { 
    id: 'al-3', 
    name: 'Rohan Gupta', 
    email: 'rohan@mmmut.ac.in', 
    avatar: getRandomAvatar('al-3'), 
    role: 'Data Scientist', 
    company: 'Amazon', 
    batch: 2020, 
    branch: 'CSE', 
    domain: 'AI/ML', 
    experience: 4, 
    cgpa: 9.0, 
    location: 'Seattle', 
    bio: "Turning data into actionable insights. Expert in NLP and Predictive Analytics.",
    collegeThoughts: "Prof. S.K. Singh's lectures on Algorithms gave me the foundation I rely on every day.",
    projects: [
        { title: "Customer Sentiment Analysis", description: "Improved recommendation engine accuracy by 15% using BERT models.", role: "ML Engineer", year: "2022" }
    ],
    socials: { linkedin: '#' } 
  },
  { 
    id: 'al-4', 
    name: 'Priya Patel', 
    email: 'priya@mmmut.ac.in', 
    avatar: getRandomAvatar('al-4'), 
    role: 'Embedded Engineer', 
    company: 'Qualcomm', 
    batch: 2017, 
    branch: 'ECE', 
    domain: 'Core', 
    experience: 7, 
    cgpa: 8.5, 
    location: 'San Diego', 
    bio: "Working at the intersection of hardware and software. Specializing in 5G chipset firmware.",
    collegeThoughts: "The Robotics Club (Robomania) was where I wrote my first line of C code for an Arduino. That sparked everything.",
    projects: [
        { title: "Snapdragon 5G Modem", description: "Firmware optimization for low-power states.", role: "Staff Engineer", year: "2021-Present" }
    ],
    socials: { linkedin: '#' } 
  },
  { 
    id: 'al-5', 
    name: 'Amit Verma', 
    email: 'amit@mmmut.ac.in', 
    avatar: getRandomAvatar('al-5'), 
    role: 'Senior Civil Engineer', 
    company: 'L&T', 
    batch: 2015, 
    branch: 'Civil', 
    domain: 'Core', 
    experience: 9, 
    cgpa: 8.1, 
    location: 'Mumbai', 
    bio: "Building the infrastructure of tomorrow. Expertise in structural analysis and green building technologies.",
    collegeThoughts: "The survey camps in 3rd year taught me team management under pressure more than any management course could.",
    projects: [
        { title: "Metro Line 3 Tunneling", description: "Managed a team for underground tunneling operations in South Mumbai.", role: "Project Lead", year: "2019-2023" }
    ],
    socials: { linkedin: '#' } 
  },
  { 
    id: 'al-6', 
    name: 'Sneha Reddy', 
    email: 'sneha@mmmut.ac.in', 
    avatar: getRandomAvatar('al-6'), 
    role: 'Backend Dev', 
    company: 'Swiggy', 
    batch: 2021, 
    branch: 'IT', 
    domain: 'Software', 
    experience: 3, 
    cgpa: 8.7, 
    location: 'Bangalore', 
    bio: "Go and Java developer. Obsessed with high availability and low latency systems.",
    collegeThoughts: "Participating in SIH 2020 represented our college on a national level. Best memory ever.",
    projects: [
        { title: "Order Management Service", description: "Rewrote the legacy OMS in Go for 10x throughput.", role: "SDE-2", year: "2023" }
    ],
    socials: { linkedin: '#' } 
  },
  { 
    id: 'al-7', 
    name: 'Arjun Das', 
    email: 'arjun@mmmut.ac.in', 
    avatar: getRandomAvatar('al-7'), 
    role: 'Automotive Design Lead', 
    company: 'Tata Motors', 
    batch: 2018, 
    branch: 'ME', 
    domain: 'Design', 
    experience: 6, 
    cgpa: 7.9, 
    location: 'Pune', 
    bio: "Passionate about EV chassis design and aerodynamics. CAD/CAM expert.",
    collegeThoughts: "SAE Baja was my life. Building that buggy from scratch taught me engineering reality.",
    projects: [
        { title: "Nexon EV Platform", description: "Contributed to the battery pack integration design.", role: "Design Engineer", year: "2020" }
    ],
    socials: { linkedin: '#' } 
  },
  { 
    id: 'al-9', 
    name: 'Rahul Yadav', 
    email: 'rahul@mmmut.ac.in', 
    avatar: getRandomAvatar('al-9'), 
    role: 'Scientist "SC"', 
    company: 'ISRO', 
    batch: 2016, 
    branch: 'ECE', 
    domain: 'Research', 
    experience: 8, 
    cgpa: 9.5, 
    location: 'Bangalore', 
    bio: "Contributing to India's space missions. Specialization in satellite communication systems.",
    collegeThoughts: "The discipline and academic rigor of the ECE department prepared me for the precision required at ISRO.",
    projects: [
        { title: "Communication Payload", description: "RF subsystem design for high-throughput satellites.", role: "Scientist", year: "2018-Present" }
    ],
    socials: { linkedin: '#' } 
  },
  { 
    id: 'al-15', 
    name: 'Rajiv Malhotra', 
    email: 'rajiv@mmmut.ac.in', 
    avatar: getRandomAvatar('al-15'), 
    role: 'Power Systems Engineer', 
    company: 'PowerGrid', 
    batch: 2015, 
    branch: 'EE', 
    domain: 'Core', 
    experience: 9, 
    cgpa: 7.8, 
    location: 'Gurgaon', 
    bio: "Ensuring grid stability and integrating renewable energy sources.",
    collegeThoughts: "Electrical labs with those huge machines were intimidating but fascinating. That's where I fell in love with power systems.",
    projects: [
        { title: "Green Energy Corridor", description: "Grid integration of 500MW solar park.", role: "Assistant Manager", year: "2021" }
    ],
    socials: { linkedin: '#' } 
  }
];

export const MOCK_POSTS: CollaborationPost[] = [
  {
    id: '101',
    authorId: 'mock-1',
    authorName: 'Aarav Sharma',
    authorAvatar: getRandomAvatar('mock-Aarav-1'),
    title: 'Smart India Hackathon 2025',
    description: 'Looking for a UI/UX Designer and a Flutter developer for the upcoming SIH. We have a solid backend idea ready.',
    type: 'Hackathon',
    requiredSkills: ['Figma', 'Flutter', 'Firebase'],
    postedAt: '2h ago',
    openRoles: 2
  },
  {
    id: '102',
    authorId: 'mock-6',
    authorName: 'Saanvi Patel',
    authorAvatar: getRandomAvatar('mock-Saanvi-6'),
    title: 'Google Solution Challenge',
    description: 'Forming a team for Google Solution Challenge. Aiming to solve a UN SDG using AI/ML.',
    type: 'Hackathon',
    requiredSkills: ['Machine Learning', 'TensorFlow', 'Python'],
    postedAt: '5h ago',
    openRoles: 1
  },
  {
    id: '103',
    authorId: 'nitin-deep',
    authorName: 'Nitin Deep',
    authorAvatar: 'https://ui-avatars.com/api/?name=Nitin+Deep&background=2563EB&color=fff',
    title: 'CampusConnect v2 Contributor',
    description: 'Expanding the platform with AI matching features. Looking for motivated developers to join the VisionX core team.',
    type: 'Project',
    requiredSkills: ['React', 'Firebase', 'Gemini API'],
    postedAt: '1h ago',
    openRoles: 3
  }
];