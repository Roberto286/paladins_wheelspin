import { Champion } from '../interfaces/Champion';
import makeRequest from './axios';
import urls from './urls/championsUrls';

export const getAllChampions = (): Promise<Champion[]> => {
  const { getAllChampionsURLReversed: url } = urls;
  const customErrorMessage =
    "Non è stato possibile raggiungere il server pertanto l'applicazione non è disponibile. Si prega di riprovare più tardi";
  return makeRequest<Champion[]>(String(url), customErrorMessage);
};

export const getRandomChamp = (): Promise<Champion> => {
  const { getRandomChampionURL: url } = urls;
  return makeRequest<Champion>(String(url));
};
