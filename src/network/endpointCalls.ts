import axios, { AxiosInstance, AxiosResponse } from 'axios';
import http from 'http';
import { Champion } from '../interfaces/Champion';
import urls from './championsUrls';

const showLoadingSpinner = () => {
  const ldsContainer = document.querySelector('.lds-container');
  if (ldsContainer) {
    ldsContainer.classList.remove('hide');
  }
};

const hideLoadingSpinner = () => {
  const ldsContainer = document.querySelector('.lds-container');
  if (ldsContainer) {
    ldsContainer.classList.add('hide');
  }
};
const Axios: AxiosInstance = axios.create({
  withCredentials: false, // TODO -> Backend will soon have authentication
  httpAgent: new http.Agent({ keepAlive: true }),
});

Axios.interceptors.request.use(config => {
  showLoadingSpinner();
  return config;
});

Axios.interceptors.response.use(response => {
  hideLoadingSpinner();
  return response;
});

const fetchAndHandleErrors = async <T>(url: string, errorMessage: string): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await Axios.get(url);
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
