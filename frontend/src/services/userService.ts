import axios from './axios';
import type { User } from '../types';

const ENDPOINT = '/users';

export const registerUser = (user: Partial<User> & { userType: string }) => {
  switch (user.userType.toLowerCase()) {
    case 'candidate':
      return axios.post('/candidates', user);
    case 'recruiter':
      return axios.post('/recruiters', user);
    case 'administrator':
      return axios.post('/administrators', user);
    default:
      throw new Error('Unsupported user type');
  }
};


export const getAllUsers = () => axios.get(ENDPOINT);

export const updateUser = (id: number, user: Partial<User>) =>
  axios.put<User>(`${ENDPOINT}/${id}`, user);

export const deleteUser = (id: number) =>
  axios.delete(`${ENDPOINT}/${id}`);
