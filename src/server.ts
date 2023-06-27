import express, { Express, ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import path from 'path';
import routes from './routes';
import { handleError } from './utils';

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

app.use(handleError);

app.listen(port, () => {
  console.log(`[Server]: I am running at http://localhost:${port}`);
});
