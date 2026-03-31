import axios from 'axios';

const baseURL = process.env.BACKEND_URL;

export const serverApi = axios.create({
  baseURL,
  withCredentials: true,
});
