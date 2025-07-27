import axios from './axios';

const ENDPOINT = '/jobalerts';

export const getJobAlertsByCandidateId = (candidateId: number) => {
  return axios.get(`${ENDPOINT}/candidate/${candidateId}`);
};

export const deleteJobAlert = (id: number) =>
  axios.delete(`/JobAlerts/${id}`);
