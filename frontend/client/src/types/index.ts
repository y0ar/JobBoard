export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  resumes?: Resume[];
}

export interface Company {
  id: number;
  name: string;
  description: string;
  jobs?: Job[];
}

export interface Resume {
  id: number;
  userId: number;
  title: string;
  content: string;
  user?: User;
}

export interface Category {
  id: number;
  name: string;
  jobs?: Job[];
}

export interface Job {
  id: number;
  title: string;
  description: string;
  location: string;
  categoryId: number;
  companyId?: number;
  category?: Category;
  company?: Company;
}
