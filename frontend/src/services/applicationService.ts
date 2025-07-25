import axios from './axios';
import type { Application } from '../types';

const ENDPOINT = '/applications';

export const getAllApplications = () => axios.get<Application[]>(ENDPOINT);

export const getApplicationById = (id: number) => axios.get<Application>(`${ENDPOINT}/${id}`);

export const addApplication = (application: Omit<Application, 'id'>) =>
  axios.post<Application>(ENDPOINT, application);

export const updateApplicationStatus = (id: number, status: string) =>
  axios.put(`${ENDPOINT}/${id}/status`, status, {
    headers: { 'Content-Type': 'application/json' },
  });
