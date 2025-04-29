import api from "./axios";
import { User } from "../types";

export const getUsers = async (): Promise<User[]> => {
  const res = await api.get<User[]>("/Users");
  return res.data;
};
