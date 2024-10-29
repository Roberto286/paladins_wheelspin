import { Router } from 'express';
import { getAllChampions, getRandomChampion } from './methods.js';

const router = Router();

router.get('/', getAllChampions);

router.get('/random', getRandomChampion);

export default router;
