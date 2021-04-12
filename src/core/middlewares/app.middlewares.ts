import { Application, Router, urlencoded, json } from "express";
import helmet from "helmet";
import cors from "cors";
import logger from "morgan";
import compression from "compression";
import { ErrorMiddleware } from "./error.middlewares";
import { RouteLayer } from "../interface/routerLayer";
import { RequestBodyMiddlewares } from "./request.body.middlewares";

interface IRoute {
  name: string;
  route: RouteLayer;
}
//abstract 
export default class AppMiddleware {
  protected app: Application;
  protected routes: IRoute[] = [];
  constructor(app: Application) {
    this.app = app;
  }

  public addRoute(name: string, route: RouteLayer) {
    this.routes.push({ name, route });
  }

  public run() {
    this.globalMiddlewares();
    this.routes.forEach((module: IRoute) => this.app.use(`${module.name}`, module.route.getRoutes()));
    this.errorHandlingMiddlerwares();
  }

  /* global middlewares  */
  protected globalMiddlewares() {
    this.app.use(helmet());

    // cors origin permission
    this.app.use(cors())

    // HTTP request logs
    this.app.use(logger('dev'))

    // compression
    this.app.use(compression())

    // parse application/x-www-form-urlencoded
    this.app.use(urlencoded({ extended: true }))

    // parse application/json
    this.app.use(json())

    // trim empty attribute
    this.app.use(RequestBodyMiddlewares.trimAttributeMiddleware)
    // remove empty attribute
    this.app.use(RequestBodyMiddlewares.clearEmptyAttributesMiddleware)
  }

  protected errorHandlingMiddlerwares() {
    // Not Found
    this.app.use(ErrorMiddleware.notFound);

    // handling error logs, 
    this.app.use(ErrorMiddleware.optimizeErrorResponse);

    // Error Handler
    this.app.use(ErrorMiddleware.errorResponseHandler);
  }
}
