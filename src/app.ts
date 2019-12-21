import 'source-map-support/register'
import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import compression from 'compression';

const app = express();

app.use(cors())
app.use(logger('dev'))
app.use(compression())

app.get('/', (req, res) => {
  res.send("ok")
});


export default app;

