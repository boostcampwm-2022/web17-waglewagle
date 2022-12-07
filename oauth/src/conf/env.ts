import * as dotenv from 'dotenv';
import { deepFreeze } from '../util/utils';

dotenv.config();

const ENV =
  process.env.NODE_ENV === 'production'
    ? deepFreeze({
        DB: {
          HOST: process.env.DB_HOST as string,
          PORT: parseInt(process.env.DB_PORT as string),
          USERNAME: process.env.DB_USERNAME as string,
          PASSWORD: process.env.DB_PASSWORD as string,
          DBMS: process.env.DB_DBMS as string,
          SCHEME: process.env.DB_SCHEME as string,
        },
        SERVER: {
          PORT: parseInt(process.env.SERVER_PORT as string),
          HOST: process.env.SERVER_HOST as string,
        },
        GITHUB: {
          REQUEST_LOGIN_URL: process.env.GITHUB_REQUEST_LOGIN_URL as string,
          REDIRECT_URL: process.env.GITHUB_REDIRECT_URL as string,
          CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET as string,
          CLIENT_ID: process.env.GITHUB_CLIENT_ID as string,
          REQUEST_TOKEN_URL: process.env.GITHUB_REQUEST_TOKEN_URL as string,
          REQUEST_USER_PROFILE: process.env
            .GITHUB_REQUEST_USER_PROFILE as string,
        },
      })
    : deepFreeze({
        DB: {
          HOST: process.env.DB_DEV_HOST as string,
          PORT: parseInt(process.env.DB_DEV_PORT as string),
          USERNAME: process.env.DB_DEV_USERNAME as string,
          PASSWORD: process.env.DB_DEV_PASSWORD as string,
          DBMS: process.env.DB_DEV_DBMS as string,
          SCHEME: process.env.DB_DEV_SCHEME as string,
        },
        SERVER: {
          PORT: parseInt(process.env.SERVER_DEV_PORT as string),
          HOST: process.env.SERVER_DEV_HOST as string,
        },
        GITHUB: {
          REQUEST_LOGIN_URL: process.env.GITHUB_DEV_REQUEST_LOGIN_URL as string,
          REDIRECT_URL: process.env.GITHUB_DEV_REDIRECT_URL as string,
          CLIENT_SECRET: process.env.GITHUB_DEV_CLIENT_SECRET as string,
          CLIENT_ID: process.env.GITHUB_DEV_CLIENT_ID as string,
          REQUEST_TOKEN_URL: process.env.GITHUB_DEV_REQUEST_TOKEN_URL as string,
          REQUEST_USER_PROFILE: process.env
            .GITHUB_DEV_REQUEST_USER_PROFILE as string,
        },
      });

export default ENV;
