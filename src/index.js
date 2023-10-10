require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const Database = require('./lib/database/Database');
const path = require('path');
const bodyParser = require('body-parser');
const colorThief = require('colorthief');
const Utility = require('./lib/utility');

const databaseFilePath = path.join(__dirname, process.env.DATABASE_FILE_PATH); // TODO: Make it configurable

const port = process.env.PORT || 7000; //TODO -> MOVE TO CONFIG FILE

const app = express();
const database = new Database(databaseFilePath);

app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

async function getRandomChampion(req, res) {
  const roles = Array.isArray(req.query.roles) ? req.query.roles : [req.query.roles];
  const randomChampion = await database.getRandomChampion(roles);
  const championImgFilePath = path.join(__dirname, randomChampion.img_path);

  let dominantColor;

  try {
    dominantColor = await colorThief.getColor(championImgFilePath);
  } catch (error) {
    console.error('Error getting dominant color:', error);
    dominantColor = [255, 255, 255];
  }

  randomChampion.dominant_color = Utility.rgbToHex(dominantColor[0], dominantColor[1], dominantColor[2]);

  res.send(randomChampion);
}

async function getAllChampions(req, res) {
  try {
    let roles = req.query.roles || [];
    roles = Array.isArray(roles) ? roles : [roles];
    const champions = roles.length ? await database.getChampionsByRoles(roles) : await database.getAllChampions();

    await Promise.all(
      champions.map(async champ => {
        const championImgFilePath = path.join(__dirname, champ.img_path);

        try {
          const dominantColor = await colorThief.getColor(championImgFilePath);
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
