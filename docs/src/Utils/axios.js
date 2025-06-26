import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "https://amc-services.onrender.com", 
  withCredentials: true, 
});

export default axiosInstance;
