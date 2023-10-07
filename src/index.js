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
  const randomChampion = await database.getRandomChampion('Damage');
  res.send(randomChampion);
}

app.get('/ping', (req, res) => {
  res.send('OK');
});

app.get('/random', getRandomChampion);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
