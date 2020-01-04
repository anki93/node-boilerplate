import { Application } from "express"
import cors from 'cors';
import logger from 'morgan';
import compression from 'compression';
import bodyParser from "body-parser";
import helmet from "helmet";
import notFound from "./notFound";
import errorResponse from "./errorResponse";
import routes from '../routes'

export default (app: Application) => {

  // security 
  app.use(helmet());

  // cors origin permission
  app.use(cors())

  // HTTP request logs
  app.use(logger('dev'))

  // compression
  app.use(compression())

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }))

  // parse application/json
  app.use(bodyParser.json())

  // routes
  routes(app)

  // Not Found
  app.use(notFound);

  // Error Handler
  app.use(errorResponse);
}