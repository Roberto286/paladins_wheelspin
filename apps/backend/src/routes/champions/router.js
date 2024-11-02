const { Router } = require('express');
const { getAllChampions, getRandomChampion } = require('./methods');

const router = Router();

router.get('/', getAllChampions);

router.get('/random', getRandomChampion);

module.exports = router;
