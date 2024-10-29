import path from 'path';
import * as colorThief from 'colorthief';
import { Database } from '../../lib/database/Database.js';
import { rgbToHex } from '../../lib/utility.js';

const databaseFilePath = process.env.DATABASE_FILE_PATH || '';
const staticFolder = process.env.STATIC_FOLDER || '';
const database = new Database(databaseFilePath);
const { getColor } = colorThief;

export async function getRandomChampion(req, res) {
  try {
    const roles = Array.isArray(req.query.roles)
      ? req.query.roles
      : [req.query.roles].filter(Boolean);
    const randomChampion = await database.getRandomChampion(roles);
    const champServerImgPath = path.join(staticFolder, randomChampion.img_path);
    const dominantColor = await getColor(champServerImgPath);
    randomChampion.dominant_color = rgbToHex(
      dominantColor[0],
      dominantColor[1],
      dominantColor[2],
    );
    res.send(randomChampion);
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).send('Internal Server Error');
  }
}

export async function getAllChampions(req, res) {
  try {
    const reversed = req.query.reversed === 'true';
    const roles = Array.isArray(req.query.roles)
      ? req.query.roles
      : [req.query.roles].filter(Boolean);
    const champions = roles.length
      ? await database.getChampionsByRoles(roles, reversed)
      : await database.getAllChampions(reversed);

    await Promise.all(
      champions.map(async (champ) => {
        const champServerImgPath = path.join(staticFolder, champ.img_path);
        try {
          const dominantColor = await getColor(champServerImgPath);
          champ.dominant_color = rgbToHex(
            dominantColor[0],
            dominantColor[1],
            dominantColor[2],
          );
        } catch (error) {
          console.error('Error getting dominant color:', error);
          champ.dominant_color = '#FFFFFF';
        }
      }),
    );

    res.send(champions);
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).send('Internal Server Error');
  }
}