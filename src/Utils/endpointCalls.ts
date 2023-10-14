import axios from 'axios';
import { IChampion } from './Interfaces';

const port = 5623;
const baseApiUrl = `http://localhost:${port}`;
const getAllChampionsURLReversed = `${baseApiUrl}/champions?reversed=true`;
const getRandomChampionURL = `${baseApiUrl}/random`;

const axiosConfig = {
  withCredentials: false, // TODO -> Backend will soon have authentication
};

const AXIOS = axios.create(axiosConfig);

const fetchAndHandleErrors = async <T>(url: string, errorMessage: string): Promise<T> => {
  try {
    const response = await AXIOS.get<T>(url);
    return response.data;
  } catch (error) {
    throw new Error(errorMessage);
  }
};

export const getAllChampions = async (): Promise<IChampion[]> => {
  return fetchAndHandleErrors<IChampion[]>(getAllChampionsURLReversed, 'Error fetching champion data');
};

export const getRandomChamp = async (): Promise<IChampion> => {
  return fetchAndHandleErrors<IChampion>(getRandomChampionURL, 'Champion data not found in the response');
};
