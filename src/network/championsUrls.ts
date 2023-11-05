type URL = string;
interface ChampionURLs {
  [key: string]: URL;
}

const getAllChampionsURLReversed: URL = `/champions?reversed=true`;
const getRandomChampionURL: URL = `/champions/random`;

const championURLs: ChampionURLs = {
  getAllChampionsURLReversed,
  getRandomChampionURL,
};

export default championURLs;
