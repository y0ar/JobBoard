import axios from 'axios';
import type { Interview } from '../types';

const ENDPOINT = '/interviews';

export function getAllInterviews() {
  return axios.get<Interview[]>(ENDPOINT);
}

export function createInterview(interview: Omit<Interview, 'id'>) {
  return axios.post<Interview>(ENDPOINT, interview);
}

export function updateInterview(id: number, interview: Interview) {
  return axios.put<Interview>(`${ENDPOINT}/${id}`, interview);
}

export function deleteInterview(id: number) {
  return axios.delete(`${ENDPOINT}/${id}`);
}
