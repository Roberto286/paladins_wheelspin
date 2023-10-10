import axios from 'axios';
import { Champions } from './Interfaces';

export const numberOfSlices = 47;
export const wheelRadius = 360;
export const sliceSize = wheelRadius / numberOfSlices;
const port = 5623;
const getAllChampionsURL = `http://localhost:${port}/champions`;

export const createDynamicObject = () => {
  const dinamicObj = Object.fromEntries(Array.from({ length: numberOfSlices }, (_, i) => [i + 1, numberOfSlices - i]));
  return dinamicObj;
};

export const prizeDisplay = (actualDeg: number, array: Champions[]) => {
  const positionInTheWheel = Math.round(actualDeg / sliceSize);
  let fiteredChamp;
  if (positionInTheWheel === 0) {
    [fiteredChamp] = array;
  } else {
    fiteredChamp = array.find(e => e.id === positionInTheWheel);
  }
  return fiteredChamp;
};

export const getAllChampions = async () => {
  try {
    const response = await axios.get<Champions[]>(getAllChampionsURL);
    return response.data.reverse();
  } catch (error) {
    return [];
  }
};
