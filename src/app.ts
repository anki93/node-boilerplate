import 'source-map-support/register'
import express from 'express';
import middlerwares from './middlewares';

const app = express();

// middlewares
middlerwares(app);

export default app;
