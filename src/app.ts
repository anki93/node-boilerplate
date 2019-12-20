import 'source-map-support/register'
import express from 'express';
import logger from 'morgan';

const app = express();

app.use(logger('dev'))

app.get('/', (req, res) => {
  res.send("ok")
});


export default app;

