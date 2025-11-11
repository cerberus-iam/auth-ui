import axios from 'axios';

const DEFAULT_API_BASE_URL = 'https://api.cerberus-iam.com';
const trimTrailingSlash = (value: string): string =>
  value.endsWith('/') ? value.replace(/\/+$/, '') : value;

const API_BASE_URL = import.meta.env.VITE_API_URL || DEFAULT_API_BASE_URL;
const ISSUER_BASE_URL = trimTrailingSlash(
  import.meta.env.VITE_ISSUER_URL || API_BASE_URL
);

// Configure axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important: Send cookies with requests
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor to get CSRF token before requests
api.interceptors.request.use(
  async (config) => {
    // For state-changing requests, ensure we have a CSRF token
    if (
      ['post', 'put', 'patch', 'delete'].includes(
        config.method?.toLowerCase() || ''
      )
    ) {
      try {
        await axios.get(`${API_BASE_URL}/sanctum/csrf-cookie`, {
          withCredentials: true,
        });
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

export { api, API_BASE_URL, ISSUER_BASE_URL };
