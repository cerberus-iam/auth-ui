import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.cerberus-iam.com';

// Configure axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important: Send cookies with requests
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor to get CSRF token before requests
api.interceptors.request.use(
  async (config) => {
    // For state-changing requests, ensure we have a CSRF token
    if (['post', 'put', 'patch', 'delete'].includes(config.method?.toLowerCase() || '')) {
      try {
        await axios.get(`${API_BASE_URL}/sanctum/csrf-cookie`, { withCredentials: true });
      } catch (error) {
        console.error('Failed to fetch CSRF token:', error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { api, API_BASE_URL };
