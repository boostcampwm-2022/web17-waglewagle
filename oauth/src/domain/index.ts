import { Router } from 'express';
import oauthController from './oauth/oauth.controller';

const router = Router();

Object.entries(oauthController).forEach(([path, { method, handler }]) => {
  router[method](path, handler);
});

export default router;
