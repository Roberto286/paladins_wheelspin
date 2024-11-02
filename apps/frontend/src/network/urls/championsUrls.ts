type URL = string;
interface ChampionURLs {
  [key: string]: URL;
}

const getAllChampionsURLReversed: URL = `/api/champions?reversed=true`;
const getRandomChampionURL: URL = `/api/champions/random`;

const championURLs: ChampionURLs = {
  getAllChampionsURLReversed,
  getRandomChampionURL,
};

export default championURLs;
