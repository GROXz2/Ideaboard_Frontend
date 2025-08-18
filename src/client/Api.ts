import axios from 'axios';

const Api = axios.create({
  baseURL: process.env.API_BASE_URL,
});

let authToken: string | undefined;
export function setAuthToken(token?: string) {
  authToken = token;
}

Api.interceptors.request.use((config) => {
  if (authToken) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

export default Api;
