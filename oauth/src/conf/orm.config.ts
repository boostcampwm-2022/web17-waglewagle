import { DataSourceOptions } from 'typeorm';
import { User } from '../domain/oauth/user.entity';
import ENV from './env';

const ormConfig = Object.freeze({
  type: 'mysql' as const,
  host: ENV.DB.HOST,
  username: ENV.DB.USERNAME,
  password: ENV.DB.PASSWORD,
  database: ENV.DB.SCHEME,
  entities: [User],
  charset: 'UTF8_GENERAL_CI',
  connectTimeout: 5000,
  bigint: true,
}) as DataSourceOptions;

export default ormConfig;
