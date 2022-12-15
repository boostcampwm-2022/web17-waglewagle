import app from './app';
import ENV from './conf/env';
import dataSource from './database/data-source';

dataSource.initialize().then(() => {
  console.log('Database Initialized');
  app.listen(ENV.SERVER.PORT, () => {
    console.log('Server Listening on', ENV.SERVER.PORT);
  });
});
