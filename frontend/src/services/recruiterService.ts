import axios from './axios';
import type { Recruiter, Application } from '../types';

const ENDPOINT = '/recruiters';

export const getAllRecruiters = () => axios.get<Recruiter[]>(ENDPOINT);

export const getRecruiterById = (id: number) => axios.get<Recruiter>(`${ENDPOINT}/${id}`);

export const addRecruiter = (recruiter: Omit<Recruiter, 'id'>) =>
  axios.post<Recruiter>(ENDPOINT, recruiter);

export const getApplicationsByRecruiterId = async (recruiterId: number): Promise<Application[]> => {
  const res = await axios.get(`${ENDPOINT}/${recruiterId}/applications`);
  return res.data;
};
