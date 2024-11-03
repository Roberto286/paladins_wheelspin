const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { urlencoded } = express;
const championsRouter = require('./routes/champions/router');
const path = require('node:path');

const port = 6789;
const staticFolder = 'src/resources';
const app = express();
const FE_DIST = path.join(__dirname, '..', '..', 'frontend', 'dist');
const indexHtmlPath = path.join(FE_DIST, 'index.html');

const apiRouter = express.Router();

app.use(cors());

// Body parser middleware
app.use(urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static file serving
app.use(
  express.static(staticFolder, {
    setHeaders: (res) => {
      res.set('Cross-Origin-Opener-Policy', 'same-site');
      res.set('Cross-Origin-Embedder-Policy', 'require-corp');
    },
  }),
);
app.use(
  express.static(FE_DIST, {
    setHeaders: (res) => {
      res.set('Cross-Origin-Opener-Policy', 'same-site');
      res.set('Cross-Origin-Embedder-Policy', 'require-corp');
    },
  }),
);

// API router middleware
apiRouter.get('/ping', (_, res) => {
  res.send('OK');
});
apiRouter.use('/champions', championsRouter);

// API routes
app.use('/api', apiRouter);

// Catch-all for API requests
app.all('/api/*', (_, res) => {
  res.status(404).json({ error: 'API route not found' });
});

// Catch-all route for non-API requests
app.get('*', (_, res) => {
  res.sendFile(indexHtmlPath);
});

// Start the server
app.listen(port, '127.0.0.1', () => {
  console.log(`Listening on port ${port}`);
});
