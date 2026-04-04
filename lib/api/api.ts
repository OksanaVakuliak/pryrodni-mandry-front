import axios from 'axios';
import toast from 'react-hot-toast';

const baseURL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  'http://localhost:3000/api';

const instance = axios.create({
  baseURL,
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || 'Щось пішло не так...';
    toast.error(message);
    return Promise.reject(error);
  },
);

export default instance;
