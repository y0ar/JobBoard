import axios from './axios';
import type { JobAlert } from '../types';

const ENDPOINT = '/jobalerts';

export const getJobAlertsByCandidateId = (candidateId: number) => {
  return axios.get(`${ENDPOINT}/candidate/${candidateId}`);
};
