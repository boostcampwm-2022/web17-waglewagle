import express from 'express';
import router from './domain';
import notFoundErrorHandler from './domain/error/not-found';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

app.use(notFoundErrorHandler);
export default app;
