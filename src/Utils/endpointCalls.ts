import axios from 'axios';
import { Champions } from './Interfaces';

const port = 5623;
const getAllChampionsURL = `http://localhost:${port}/champions`;
const getChampionsCount = `http://localhost:${port}/count`;
const getRandomChampion = `http://localhost:${port}/random?roles=frontline&roles=support&roles=damage&roles=flank`;

export const numberOfSlices = axios.get(getChampionsCount).then(res => res.data);

export const getAllChampions = async () => {
  try {
    const response = await axios.get<Champions[]>(getAllChampionsURL);
    return response.data.reverse();
  } catch (error) {
    return [];
  }
};

export const getRandomChamp = async () => {
  try {
    const response = await axios.get<Champions>(getRandomChampion);
    return response.data;
  } catch (error) {
    return {} as Champions;
  }
};
