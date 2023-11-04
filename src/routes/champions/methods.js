const getColor = require('colorthief').getColor;
const Utility = require('../../lib/utility');
const path = require('path');
const Database = require('../../lib/database/Database');
const databaseFilePath = process.env.DATABASE_FILE_PATH || ''; // TODO: Make it configurable
const staticFolder = process.env.STATIC_FOLDER || '';
const database = new Database(databaseFilePath);

async function getRandomChampion(req, res) {
  try {
    const roles = Array.isArray(req.query.roles) && req.query.roles.length ? req.query.roles : [];
    const randomChampion = await database.getRandomChampion(roles);
    const champServerImgPath = path.join(staticFolder, randomChampion.img_path);
    const dominantColor = await getColor(champServerImgPath);
    randomChampion.dominant_color = Utility.rgbToHex(dominantColor[0], dominantColor[1], dominantColor[2]);
    res.send(randomChampion);
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).send('Internal Server Error');
  }
}

async function getAllChampions(req, res) {
  try {
    const reversed = req.query.reversed === 'true';
    const roles = Array.isArray(req.query.roles) && req.query.roles.length ? req.query.roles : [];
    const champions = roles.length
      ? await database.getChampionsByRoles(roles, reversed)
      : await database.getAllChampions(reversed);

    await Promise.all(
      champions.map(async champ => {
        const champServerImgPath = path.join(staticFolder, champ.img_path);
        try {
          const dominantColor = await getColor(champServerImgPath);
          champ.dominant_color = Utility.rgbToHex(dominantColor[0], dominantColor[1], dominantColor[2]);
        } catch (error) {
          console.error('Error getting dominant color:', error);
          champ.dominant_color = '#FFFFFF';
        }
      })
    );

    res.send(champions);
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = { getAllChampions, getRandomChampion };
