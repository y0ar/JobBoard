import api from "./axios";
import { Category } from "../types";

export const getCategories = async (): Promise<Category[]> => {
  const res = await api.get<Category[]>("/Categories");
  return res.data;
};
