import { envKey } from './env.types';
import * as dotenv from 'dotenv';
dotenv.config();

const ENV: {
  DB: {
    [key in envKey]: string;
  };
  RUN_ENV: string;
} = Object.freeze({
  DB: {
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: process.env.DB_PORT || '3306',
    DB_USERNAME: process.env.DB_USERNAME || 'dev',
    DB_PASSWORD: process.env.DB_PASSWORD || 'dev',
    DB_SCHEME: process.env.DB_SCHEME || 'dev',
  },
  RUN_ENV: process.env.RUN_ENV || 'dev',
});

export default ENV;
