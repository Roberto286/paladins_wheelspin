import { MockMethod } from 'vite-plugin-mock';
import championsList from './championsList';
import { Champion, ChampionsList } from '../../interfaces/Champion';

type GetChampionsResponse = MockMethod['response'];
type GetRandomChampion = MockMethod['response'];

type GetChampionsQuery = {
  reversed?: boolean;
  roles?: string[] | string;
};

type GetRandomChampionQuery = {
  roles?: string[] | string;
};

const championsByRole: Record<string, Champion[]> = {};
championsList.forEach(champion => {
  const { role } = champion;
  if (!championsByRole[role]) {
    championsByRole[role] = [];
  }
  championsByRole[role].push(champion);
});

const filterChampionsListByRoles = (query: GetRandomChampionQuery | GetChampionsQuery): ChampionsList => {
  let roles = query.roles || [];
  roles = Array.isArray(roles) ? roles : [roles];

  if (!roles.length) {
    return championsList;
  }

  const championsListFiltered = roles.flatMap(role => championsByRole[role] || []);
  return championsListFiltered;
};

const getChampions: GetChampionsResponse = ({ query }: { query: GetChampionsQuery }): ChampionsList => {
  const filteredList = filterChampionsListByRoles(query);
  if (query.reversed) {
    return [...filteredList].reverse();
  }
  return filteredList;
};

const getRandomChampion: GetRandomChampion = ({ query }: { query: GetRandomChampionQuery }): Champion => {
  return filterChampionsListByRoles(query)[0];
};

export default [
  {
    url: '/champions',
    method: 'get',
    response: getChampions,
  },
  {
    url: '/champions/random',
    method: 'get',
    response: getRandomChampion,
  },
] as MockMethod[];
