import api from "./axios";
import { Company } from "../types";

export const getCompany = async (): Promise<Company[]> => {
  const res = await api.get<Company[]>("/Company");
  return res.data;
};
