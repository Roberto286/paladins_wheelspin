import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import http from 'http';
import isLoaderVisible from '../Components/Spinner/methods';
import { showNotification } from '../Utils/Utils';
import NotificationType from '../enums/NotificationType.enum';

const backendAuthCredential: string = import.meta.env?.VITE_BACKEND_AUTH || '';
const axiosConfig: AxiosRequestConfig = {
  withCredentials: true,
  httpAgent: new http.Agent({ keepAlive: true }),
  headers: {
    Authorization: `Basic ${backendAuthCredential}`,
  },
};
const Axios: AxiosInstance = axios.create(axiosConfig);

const makeRequest = async <T>(url: string, customErrorMessage?: string): Promise<T> => {
  isLoaderVisible(true);
  try {
    const response: AxiosResponse<T> = await Axios.get<T>(url);
    return response.data;
  } catch (error) {
    showNotification('Error', customErrorMessage || (error as Error).message, NotificationType.DANGER);
    throw error;
  } finally {
    isLoaderVisible(false);
  }
};

export default makeRequest;
