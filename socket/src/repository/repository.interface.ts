import { DataSource } from 'typeorm';

interface RepositoryInterface {
  get dataSource(): DataSource;
}

export default RepositoryInterface;
