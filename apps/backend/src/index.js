import bodyParser from 'body-parser';
import cors from 'cors';
import express, { urlencoded } from 'express';
import helmet from 'helmet';
import { checkAuthorization } from './middlewares/authentication.js';
import championsRouter from './routes/champions/router.js';

const port = process.env.PORT || 7000; //TODO -> MOVE TO CONFIG FILE
const staticFolder = process.env.STATIC_FOLDER || '';

const app = express();

app.use(helmet());
app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(staticFolder));
app.use(checkAuthorization);

app.get('/ping', (_, res) => {
  res.send('OK');
});

app.use('/champions', championsRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
