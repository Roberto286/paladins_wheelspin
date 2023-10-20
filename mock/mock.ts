// mock/test.ts

// eslint-disable-next-line import/no-extraneous-dependencies
import { MockMethod } from 'vite-plugin-mock';
import championsList from './championsList.json';

export default [
  {
    url: '/champions',
    method: 'get',
    response: ({ query }) => {
      if (query.reversed) {
        return championsList.reverse();
      }
      return championsList;
    },
  },
] as MockMethod[];
