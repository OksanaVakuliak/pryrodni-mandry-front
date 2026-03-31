import instance from './api';
import { User } from '@/types/Users';

export interface AuthRequest {
  email: string;
  password: string;
}

export const clientApi = {
  register: async (credentials: AuthRequest): Promise<User> => {
    const { data } = await instance.post<User>('/auth/register', credentials);
    return data;
  },
};
