import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import http from 'http';
import { Champion } from '../interfaces/Champion';
import urls from './championsUrls';

const backendAuthCredential: string = import.meta.env?.VITE_BACKEND_AUTH || '';
const axiosConfig: AxiosRequestConfig = {
  withCredentials: true,
  httpAgent: new http.Agent({ keepAlive: true }),
  headers: {
    Authorization: `Basic ${backendAuthCredential}`,
  },
};

const AXIOS: AxiosInstance = axios.create(axiosConfig);

AXIOS.interceptors.response.use(
  response => response.data,
  error => {
    // TODO: Show an alert with the error message instead of throwing an error
    throw new Error(error);
  }
);

const makeRequest = async <T>(url: string): Promise<T> => {
  const response: T = await AXIOS.get(url);
  return response;
};

export const getAllChampions = (): Promise<Champion[]> => {
  const { getAllChampionsURLReversed: url } = urls;
  return makeRequest<Champion[]>(String(url));
};

export const getRandomChamp = (): Promise<Champion> => {
  const { getRandomChampionURL: url } = urls;
  return makeRequest<Champion>(String(url));
};
