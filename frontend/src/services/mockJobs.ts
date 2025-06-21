import type { Job, Company } from '../types';

const mockCompanies: Company[] = [
  {
    id: 1,
    name: 'TechCorp Solutions',
    sector: 'Technology',
    address: '123 Tech Street, San Francisco, CA',
    phoneNumber: '+1 (555) 123-4567',
    email: 'contact@techcorp.com',
    jobs: []
  },
  {
    id: 2,
    name: 'Digital Innovations Inc',
    sector: 'Software Development',
    address: '456 Innovation Ave, Austin, TX',
    phoneNumber: '+1 (555) 234-5678',
    email: 'hr@digitalinnovations.com',
    jobs: []
  },
  {
    id: 3,
    name: 'CloudFirst Technologies',
    sector: 'Cloud Computing',
    address: '789 Cloud Drive, Seattle, WA',
    phoneNumber: '+1 (555) 345-6789',
    email: 'careers@cloudfirst.com',
    jobs: []
  },
  {
    id: 4,
    name: 'StartupHub',
    sector: 'Technology',
    address: '321 Startup Lane, New York, NY',
    phoneNumber: '+1 (555) 456-7890',
    email: 'jobs@startuphub.com',
    jobs: []
  },
  {
    id: 5,
    name: 'Enterprise Solutions Ltd',
    sector: 'Enterprise Software',
    address: '654 Enterprise Blvd, Chicago, IL',
    phoneNumber: '+1 (555) 567-8901',
    email: 'hiring@enterprisesolutions.com',
    jobs: []
  }
];

export const mockJobs: Job[] = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    description: 'We are looking for an experienced Frontend Developer to join our dynamic team. You will be responsible for developing user-facing web applications using modern JavaScript frameworks. The ideal candidate should have strong experience with React, TypeScript, and modern CSS frameworks.',
    location: 'San Francisco, CA',
    salary: 120000,
    postDate: '2025-01-10',
    companyId: 1,
    company: mockCompanies[0],
    applications: []
  },
  {
    id: 2,
    title: 'Full Stack Engineer',
    description: 'Join our innovative team as a Full Stack Engineer where you will work on cutting-edge web applications. We need someone proficient in both frontend and backend technologies, with experience in Node.js, React, and database management.',
    location: 'Remote',
    salary: 110000,
    postDate: '2025-01-09',
    companyId: 2,
    company: mockCompanies[1],
    applications: []
  },
  {
    id: 3,
    title: 'DevOps Engineer',
    description: 'We are seeking a skilled DevOps Engineer to help us scale our infrastructure. You will work with cloud platforms, containerization, and CI/CD pipelines. Experience with AWS, Docker, and Kubernetes is highly preferred.',
    location: 'Seattle, WA',
    salary: 130000,
    postDate: '2025-01-08',
    companyId: 3,
    company: mockCompanies[2],
    applications: []
  },
  {
    id: 4,
    title: 'Product Manager',
    description: 'Looking for a strategic Product Manager to drive product vision and roadmap. You will work closely with engineering, design, and business teams to deliver exceptional user experiences. Strong analytical and communication skills required.',
    location: 'New York, NY',
    salary: 140000,
    postDate: '2025-01-07',
    companyId: 4,
    company: mockCompanies[3],
    applications: []
  },
  {
    id: 5,
    title: 'UX/UI Designer',
    description: 'Creative UX/UI Designer needed to design intuitive and beautiful user interfaces. You will be responsible for user research, wireframing, prototyping, and creating design systems. Proficiency in Figma and design thinking methodologies is essential.',
    location: 'Los Angeles, CA',
    salary: 95000,
    postDate: '2025-01-06',
    companyId: 1,
    company: mockCompanies[0],
    applications: []
  },
  {
    id: 6,
    title: 'Data Scientist',
    description: 'We are looking for a Data Scientist to analyze complex datasets and provide actionable insights. You will work with machine learning algorithms, statistical analysis, and data visualization tools. Experience with Python, R, and SQL is required.',
    location: 'Chicago, IL',
    salary: 125000,
    postDate: '2025-01-05',
    companyId: 5,
    company: mockCompanies[4],
    applications: []
  },
  {
    id: 7,
    title: 'Backend Developer',
    description: 'Join our backend team to build scalable and robust server-side applications. You will work with microservices architecture, APIs, and database optimization. Strong knowledge of Node.js, Python, or Java is preferred.',
    location: 'Austin, TX',
    salary: 105000,
    postDate: '2025-01-04',
    companyId: 2,
    company: mockCompanies[1],
    applications: []
  },
  {
    id: 8,
    title: 'Mobile App Developer',
    description: 'Experienced Mobile App Developer wanted to create amazing mobile experiences. You will develop native iOS and Android applications or work with cross-platform frameworks like React Native or Flutter.',
    location: 'Remote',
    salary: 115000,
    postDate: '2025-01-03',
    companyId: 3,
    company: mockCompanies[2],
    applications: []
  }
];