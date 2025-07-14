import { logout } from '@/redux/authSlice';
import { store } from '@/redux/store';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "https://amc-services.onrender.com", 
  withCredentials: true, 
});
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logout());
      window.location.href = "/"; // or use navigate if available
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
