type URL = string;

const getAllChampionsURLReversed: URL = `/champions?reversed=true`;
const getRandomChampionURL: URL = `/random`;

interface ChampionURLs {
  [key: string]: URL;
}

const championURLs: ChampionURLs = {
  getAllChampionsURLReversed,
  getRandomChampionURL,
};

export default championURLs;
