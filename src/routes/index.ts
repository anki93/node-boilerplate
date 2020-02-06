import { Application } from "express";
import users from "./user"

export default (app: Application) => {
  app.use("/user", users)
}
