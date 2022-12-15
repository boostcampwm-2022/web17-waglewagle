import { DataSourceOptions } from 'typeorm';
import { User } from './../entity/User';
import { Thread } from './../entity/Thread';
import { KeywordUser } from './../entity/KeywordUser';
import { Keyword } from './../entity/Keyword';
import { CommunityUser } from './../entity/CommunityUser';
import { Community } from './../entity/Community';
import ENV from './env';

const ormConfig: DataSourceOptions = Object.freeze({
  type: 'mysql' as const,
  host: ENV.DB.DB_HOST,
  username: ENV.DB.DB_USERNAME,
  password: ENV.DB.DB_PASSWORD,
  database: ENV.DB.DB_SCHEME,
  entities: [User, Thread, KeywordUser, Keyword, CommunityUser, Community],
  charset: 'UTF8_GENERAL_CI',
  connectTimeout: 5000,
  bigint: true,
  // logging: true,
  synchronize: true,
});

export default ormConfig;
