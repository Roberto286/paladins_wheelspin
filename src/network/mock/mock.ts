// mock/test.ts

// eslint-disable-next-line import/no-extraneous-dependencies
import { MockMethod } from 'vite-plugin-mock';
import championsList from './championsList';
import { ChampionsList } from '../../interfaces/Champion';

type GetChampionsResponse = MockMethod['response'];

const getChampions: GetChampionsResponse = ({ query }): ChampionsList => {
  if (query.reversed) {
    return championsList.reverse();
  }
  return championsList;
};

export default [
  {
    url: '/champions',
    method: 'get',
    response: getChampions,
  },
] as MockMethod[];
