import api from "./axios";
import { Job } from "../types";

export const getJobs = async (): Promise<Job[]> => {
  const res = await api.get<Job[]>("/Jobs");
  return res.data;
};

export const postJob = async (job: Partial<Job>): Promise<Job> => {
  const res = await api.post<Job>("/Jobs", job);
  return res.data;
};
