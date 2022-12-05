import { DataSource } from 'typeorm';
import ormConfig from '../conf/orm.config';

export default new DataSource(ormConfig);
