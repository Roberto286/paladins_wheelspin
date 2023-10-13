import axios from 'axios';
import { IChampion } from './Interfaces';

const port = 5623;
const getAllChampionsURL = `http://localhost:${port}/champions`;
const getChampionsCount = `http://localhost:${port}/count`;
const getRandomChampion = `http://localhost:${port}/random?roles=frontline&roles=support&roles=damage&roles=flank`;

export const numberOfSlices = axios.get(getChampionsCount).then(res => res.data);

export const getAllChampions = async () => {
  try {
    const response = await axios.get<IChampion[]>(getAllChampionsURL);
    return response.data.reverse();
  } catch (error) {
    return [];
  }
};

export const getRandomChamp = async () => {
  try {
    const response = await axios.get<IChampion>(getRandomChampion);
    return response.data;
  } catch (error) {
    throw new Error(`Champion data not found in the response`);
  }
};
