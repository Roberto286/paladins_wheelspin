require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const championsRouter = require('./routes/champions/router');
const port = process.env.PORT || 7000; //TODO -> MOVE TO CONFIG FILE
const staticFolder = process.env.STATIC_FOLDER || '';
const basicAuthMiddleware = require('./middlewares/authentication');

const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(staticFolder));
app.use(basicAuthMiddleware);

app.get('/ping', (req, res) => {
  res.send('OK');
});

app.use('/champions', championsRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
