import { Request, Response } from 'express';

const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    message: 'Not Found',
  });
};

export default notFoundHandler;
