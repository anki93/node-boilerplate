import 'source-map-support/register'
import express from 'express';
import middlerwares from './middlewares';
import { mongoose } from "./config"

mongoose.connect()

const app = express();

// middlewares
middlerwares(app);

export default app;
