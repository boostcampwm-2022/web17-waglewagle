import { Request, Response, NextFunction } from 'express';

type requestHandler = (req: Request, res: Response, next?: NextFunction) => void;

export default requestHandler;
