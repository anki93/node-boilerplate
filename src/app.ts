import "source-map-support/register";
import express from "express";
import { MongoDb } from "@config/index";
import { AppMiddleware } from "@core/middlewares/app.middlewares";
import UserRoute from "./user/user.route";

new MongoDb();

const app = express();

const appMiddleware = new AppMiddleware(app);
appMiddleware.addRoute("user", new UserRoute());
appMiddleware.run();

export default app;
