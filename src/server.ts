import express, { Express, ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import path from 'path';
import routes from './routes';

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

// Error handler
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
};

app.use(errorHandler);

app.listen(port, () => {
  console.log(`[Server]: I am running at http://localhost:${port}`);
});
