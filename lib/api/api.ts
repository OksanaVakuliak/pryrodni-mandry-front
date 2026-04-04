import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

const instance = axios.create({
  baseURL,
  withCredentials: true,
});

export default instance;
