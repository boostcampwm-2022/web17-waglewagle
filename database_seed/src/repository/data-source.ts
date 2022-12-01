import { DataSource } from 'typeorm';
import ormConfig from '../config/orm-config';

export default new DataSource(ormConfig);
