import axios from './axios';
import type { Job } from '../types';

const ENDPOINT = '/jobs';

export const getAllJobs = () => axios.get<Job[]>(ENDPOINT);

export const getJobById = (id: number) => axios.get<Job>(`${ENDPOINT}/${id}`);

export const addJob = (job: Omit<Job, 'id'>) => axios.post<Job>(ENDPOINT, job);

export const updateJob = (id: number, job: Partial<Job>) =>
  axios.put<Job>(`${ENDPOINT}/${id}`, job);

export const deleteJob = (id: number) =>
  axios.delete(`${ENDPOINT}/${id}`);
