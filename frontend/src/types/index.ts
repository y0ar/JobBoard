
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  //address: string;
  userType: string;
}

export interface Recruiter extends User {
  phoneNumber: string;
  department: string;
  companyId: number;
  company?: Company;
}

export interface Candidate extends User {
  resume?: Resume;
  jobAlerts: JobAlert[];
  applications: Application[];
  studies: Study[];
  experiences: Experience[];
  skills: Skill[];
  languages: Language[];
}

export interface Administrator extends User {
  role: string;
  statistics: Statistic[];
}

export interface Company {
  id: number;
  name: string;
  sector: string;
  address: string;
  phoneNumber: string;
  email: string;
  jobs: Job[];
}

export interface Job {
  id: number;
  title: string;
  description: string;
  location: string;
  salary: number;
  workMode: string;
  jobType: string;
  postDate: string;
  companyId: number;
  company?: Company;
  applications: Application[];
}

export interface JobAlert {
  id: number;
  keyword: string;
  location: string;
  candidateId: number;
  candidate?: Candidate;
}

export interface Application {
  id: number;
  status: string;
  applicationDate: string;
  candidateId: number;
  jobId: number;
  candidate?: Candidate;
  job?: Job;
  documents: Document[];
  evaluations: Evaluation[];
  interviews: Interview[];
}

export interface Study {
  id: number;
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
  candidateId: number;
  candidate?: Candidate;
}

export interface Experience {
  id: number;
  position: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  candidateId: number;
  candidate?: Candidate;
}

export interface Skill {
  id: number;
  name: string;
  level: string;
  candidateId: number;
  candidate?: Candidate;
}

export interface Language {
  id: number;
  name: string;
  level: string;
  candidateId: number;
  candidate?: Candidate;
}

export interface Document {
  id: number;
  fileName: string;
  fileType: string;
  uploadDate: string;
  applicationId: number;
  application?: Application;
}

export interface Resume {
  id: number;
  fileName: string;
  fileType: string;
  uploadDate: string;
  candidateId: number;
  candidate?: Candidate;
}

export interface Evaluation {
  id: number;
  score: number;
  comment: string;
  date: string;
  applicationId: number;
  application?: Application;
}

export interface Interview {
  id: number;
  dateTime: string;
  location: string;
  interviewer: string;
  result: string;
  notes: string;
  applicationId: number;
  application?: Application;
}

export interface Statistic {
  id: number;
  type: string;
  period: string;
  data: string;
  administratorId: number;
  administrator?: Administrator;
}
