import axios from 'axios';
import { IChampion } from './Interfaces';

const port = 5623;
const getAllChampionsURL = `http://localhost:${port}/champions`;
const getRandomChampion = `http://localhost:${port}/random`;

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
