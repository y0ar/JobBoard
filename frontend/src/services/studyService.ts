import axios from './axios';
import type { Study } from '../types';

const ENDPOINT = '/studies';

export const getAllStudies = () => axios.get<Study[]>(ENDPOINT);

export const getStudyById = (id: number) => axios.get<Study>(`${ENDPOINT}/${id}`);

export const addStudy = (study: Omit<Study, 'id'>) =>
  axios.post<Study>(ENDPOINT, study);

export const deleteStudy = (id: number) =>
  axios.delete(`${ENDPOINT}/${id}`);
