require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const Database = require('./lib/database/Database');
const bodyParser = require('body-parser');
const colorThief = require('colorthief');
const Utility = require('./lib/utility');
const path = require('path');

const databaseFilePath = process.env.DATABASE_FILE_PATH || ''; // TODO: Make it configurable
const port = process.env.PORT || 7000; //TODO -> MOVE TO CONFIG FILE
const staticFolder = process.env.STATIC_FOLDER || '';

const app = express();
const database = new Database(databaseFilePath);

app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(staticFolder));

async function getRandomChampion(req, res) {
  let roles = req.query.roles || [];
  roles = Array.isArray(roles) ? roles : [roles];
  const randomChampion = await database.getRandomChampion(roles);
  const champServerImgPath = path.join(staticFolder, randomChampion.img_path);
  let dominantColor;

  try {
    dominantColor = await colorThief.getColor(champServerImgPath);
  } catch (error) {
    console.error('Error getting dominant color:', error);
    dominantColor = [255, 255, 255];
  }

  randomChampion.dominant_color = Utility.rgbToHex(dominantColor[0], dominantColor[1], dominantColor[2]);

  res.send(randomChampion);
}

async function getAllChampions(req, res) {
  try {
    const reversed = req.query.reversed;
    let roles = req.query.roles || [];
    roles = Array.isArray(roles) ? roles : [roles];
    const champions = roles.length
      ? await database.getChampionsByRoles(roles, !!reversed)
      : await database.getAllChampions(!!reversed);

    await Promise.all(
      champions.map(async champ => {
        const champServerImgPath = path.join(staticFolder, champ.img_path);
        try {
          const dominantColor = await colorThief.getColor(champServerImgPath);
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

app.get('/ping', (req, res) => {
  res.send('OK');
});

app.get('/random', getRandomChampion);

app.get('/champions', getAllChampions);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
