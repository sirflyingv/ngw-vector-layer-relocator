import express, { Express, Request, Response, NextFunction } from 'express';
import path from 'path';
import routes from './routes';
import ApplicationError from './errors/applicationErrors';

import errorHandler from './controllers/errorHandler';

const app: Express = express();
const port = 3000;

const frontendPath = path.join(__dirname, '../dist/frontend/');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  '/',
  express.static(frontendPath, {
    maxAge: 31557600000
  })
);

app.use(routes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`[Server]: I am running at http://localhost:${port}`);
});
