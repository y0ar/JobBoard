import axios from './axios';
import type { Experience } from '../types';

const ENDPOINT = '/experiences';

export const getAllExperiences = () => axios.get<Experience[]>(ENDPOINT);

export const getExperienceById = (id: number) => axios.get<Experience>(`${ENDPOINT}/${id}`);

export const addExperience = (experience: Omit<Experience, 'id'>) =>
  axios.post<Experience>(ENDPOINT, experience);
