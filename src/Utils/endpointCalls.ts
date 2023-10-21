import axios, { AxiosInstance } from 'axios';
import http from 'http';
import { Champion } from '../interfaces/Champion';
import urls from '../network/championsUrls';

const axiosConfig = {
  withCredentials: false, // TODO -> Backend will soon have authentication
  httpAgent: new http.Agent({ keepAlive: true }),
};

const AXIOS: AxiosInstance = axios.create(axiosConfig);

const fetchAndHandleErrors = async <T>(url: string, errorMessage: string): Promise<T> => {
  try {
    const response = await AXIOS.get<T>(url);
    return response.data;
  } catch (error) {
    throw new Error(errorMessage); // TODO -> SHOW AN ALERT WITH ERROR MESSAGE INSTEAD OF THROWING AN ERROR
  }
};

export const getAllChampions = async (): Promise<Champion[]> => {
  return fetchAndHandleErrors<Champion[]>(urls.getAllChampionsURLReversed, 'Error fetching champion data');
};

export const getRandomChamp = async (): Promise<Champion> => {
  return fetchAndHandleErrors<Champion>(urls.getRandomChampionURL, 'Champion data not found in the response');
};
