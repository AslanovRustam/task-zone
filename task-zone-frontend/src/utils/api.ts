import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:3000/api",
});

let accessToken: string | null = null;

export const setAuthToken = (token: string | null): void => {
  accessToken = token;
};

instance.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
