interface envType {
  DB_HOST: 'DB_HOST';
  DB_PORT: 'DB_PORT';
  DB_USERNAME: 'DB_USERNAME';
  DB_PASSWORD: 'DB_PASSWORD';
  DB_SCHEME: 'DB_SCHEME';
}

export type envKey = envType[keyof envType];
