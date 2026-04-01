import axios from 'axios';

export type ApiError = {
  message: string;
  status: number;
  response?: {
    data?: { error?: string };
    status?: number;
  };
};

const baseURL = process.env.BACKEND_URL;

export const serverApi = axios.create({
  baseURL,
  withCredentials: true,
});
