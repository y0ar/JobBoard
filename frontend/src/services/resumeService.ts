import axios from './axios';
import type { Resume } from '../types';

const ENDPOINT = '/resumes';

export const uploadResume = (formData: FormData) =>
  axios.post<Resume>(`${ENDPOINT}/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
});

export const deleteResume = (resumeId: number) =>
  axios.delete(`${ENDPOINT}/${resumeId}`);

