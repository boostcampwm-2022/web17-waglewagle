import { DataSourceOptions } from 'typeorm';
import ENV from './env';

const ormConfig: DataSourceOptions = Object.freeze({
  type: 'mysql' as const,
  host: ENV.DB.DB_HOST,
  username: ENV.DB.DB_USERNAME,
  password: ENV.DB.DB_PASSWORD,
  database: ENV.DB.DB_SCHEME,
  entities: ['entity/*.*'],
  charset: 'UTF8_GENERAL_CI',
  connectTimeout: 5000,
  acquireTimeout: 5000,
  synchronize: ENV.RUN_ENV === 'dev',
  bigint: true,
});

export default ormConfig;
