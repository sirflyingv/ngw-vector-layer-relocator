import { NextFunction, Request, Response } from 'express';

const catchAsync = function (fn: Function) {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

// from nglink
const handleError = (res: Response, error: unknown) => {
  console.error('nglink handleError', error);
  return res.status(404).send({
    error
  });
};

export { catchAsync, handleError };
