import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import http from 'http';
import isLoaderVisible from '../Components/Spinner/methods';

const backendAuthCredential: string = import.meta.env?.VITE_BACKEND_AUTH || '';
const axiosConfig: AxiosRequestConfig = {
  withCredentials: true,
  httpAgent: new http.Agent({ keepAlive: true }),
  headers: {
    Authorization: `Basic ${backendAuthCredential}`,
  },
};
const Axios: AxiosInstance = axios.create(axiosConfig);

Axios.interceptors.request.use(config => {
  isLoaderVisible(true);
  return config;
});

Axios.interceptors.response.use(
  response => {
    isLoaderVisible(false);
    return response.data;
  },
  error => {
    // TODO: Show an alert with the error message instead of throwing an error
    throw new Error(error);
  }
);

const makeRequest = async <T>(url: string): Promise<T> => {
  const response: T = await Axios.get(url);
  return response;
};

export default makeRequest;
