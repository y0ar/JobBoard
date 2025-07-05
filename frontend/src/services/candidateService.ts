import axios from './axios';
import type { Candidate, Experience, Study, Application } from '../types';


const ENDPOINT = '/candidates';

export const getAllCandidates = () => axios.get<Candidate[]>(ENDPOINT);

export const getCandidateById = (id: number) => axios.get<Candidate>(`${ENDPOINT}/${id}`);

export const addCandidate = (candidate: Omit<Candidate, 'id'>) =>
  axios.post<Candidate>(ENDPOINT, candidate);

export const getExperiencesByCandidateId = async (candidateId: number): Promise<Experience[]> => {
  const res = await axios.get(`${ENDPOINT}/${candidateId}/experiences`);
  return res.data;
};

export const getStudiesByCandidateId = async (candidateId: number): Promise<Study[]> => {
  const res = await axios.get(`${ENDPOINT}/${candidateId}/studies`);
  return res.data;
};

export const getApplicationsByCandidateId = async (candidateId: number): Promise<Application[]> => {
  const res = await axios.get(`${ENDPOINT}/${candidateId}/applications`);
  return res.data;
};
