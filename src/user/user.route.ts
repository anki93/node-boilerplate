import { RouteLayer } from "../core/interface/routerLayer";
import UserController from "./user.controller";
import { createRequest } from "./user.request";

export class UserRoute extends RouteLayer {
  public getRoutes() {
    this.router.get("/", UserController.list);
    this.router.post("/create", createRequest, UserController.create);
    return this.router;
  }
}

export default UserRoute;
