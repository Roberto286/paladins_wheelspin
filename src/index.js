const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const Database = require('./lib/database/Database');
const path = require('path');
const bodyParser = require('body-parser');
const databaseFilePath = path.join(__dirname, './lib/database/data.db'); // TODO: Make it configurable

const port = 5623; //TODO -> MAKE IT CONFIGURABLE

const app = express();
const database = new Database(databaseFilePath);

app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

async function getRandomChampion(req, res) {
  const roles = Array.isArray(req.query.roles) ? req.query.roles : [req.query.roles];
  const randomChampion = await database.getRandomChampion(roles);
  res.send(randomChampion);
}

async function getAllChampions(req, res) {
  let roles = req.query.roles || [];
  roles = Array.isArray(roles) ? roles : [roles];
  const champions = await (roles.length ? database.getChampionsByRoles(roles) : database.getAllChampions());
  res.send(champions);
}

app.get('/ping', (req, res) => {
  res.send('OK');
});

app.get('/random', getRandomChampion);

app.get('/champions', getAllChampions);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
