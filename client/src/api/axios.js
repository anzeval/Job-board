import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const requestUrl = error.config?.url;
    const isAuthRequest =
      requestUrl === '/auth/login' || requestUrl === '/auth/register';
    const hasToken =
      localStorage.getItem('token') ||
      error.config?.headers?.Authorization;

    if (error.response?.status === 401 && !isAuthRequest && hasToken) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.assign('/register');
    }

    return Promise.reject(error);
  },
);

export default api;
