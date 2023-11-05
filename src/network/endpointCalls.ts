import { Champion } from '../interfaces/Champion';
import urls from './urls/championsUrls';
import makeRequest from './axios';

export const getAllChampions = (): Promise<Champion[]> => {
  const { getAllChampionsURLReversed: url } = urls;
  return makeRequest<Champion[]>(String(url));
};

export const getRandomChamp = (): Promise<Champion> => {
  const { getRandomChampionURL: url } = urls;
  return makeRequest<Champion>(String(url));
};
