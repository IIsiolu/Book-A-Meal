import axios from 'axios';
import jwt from 'jwt-decode';

const instance = axios.create({
  baseURL: '/api/v1/'
});

instance.interceptors.request.use((config) => {
  config.headers.authorization = localStorage.getItem('myUserT');
  return config;
});

export default instance;
