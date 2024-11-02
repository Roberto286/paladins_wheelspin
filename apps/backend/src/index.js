const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { urlencoded } = express;
const helmet = require('helmet');
const checkAuthorization = require('./middlewares/authentication');
const championsRouter = require('./routes/champions/router');
const path = require('node:path');

const port = 6789;
const staticFolder = 'src/resources';
const app = express();
const FE_DIST = path.join(__dirname, '..', '..', 'frontend', 'dist');
const indexHtmlPath = path.join(FE_DIST, 'index.html');

const apiRouter = express.Router();

app.use(helmet());
app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(bodyParser.json());
apiRouter.use(express.static(staticFolder));
app.use(express.static(FE_DIST));
apiRouter.use(checkAuthorization);

apiRouter.get('/ping', (_, res) => {
  res.send('OK');
});

apiRouter.use('/champions', championsRouter);

// API routes
app.use('/api', apiRouter);

// Catch-all route for unhandled API requests
app.all('/api/*', (_, res) => {
  res.status(404).json({ error: 'API route not found' });
});

// Catch-all route for non-API requests
app.get('*', (_, res) => {
  res.sendFile(indexHtmlPath);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
