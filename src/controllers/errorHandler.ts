import { Request, Response, NextFunction } from 'express';

export default (error: any, req: Request, res: Response, next: NextFunction) => {
  if (!error.statusCode) {
    error.statusCode = 500;
  }

  res.status(error.statusCode).json({
    status: false,
    error: error.message
  });
};
