const router = require('express').Router();
const { getAllChampions, getRandomChampion } = require('./methods');

router.get('/', getAllChampions);

router.get('/random', getRandomChampion);

module.exports = router;
