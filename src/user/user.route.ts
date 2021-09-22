import Brute from "../config/brute";
import { RouteLayer } from "../core/interface/routerLayer";
import UserController from "./user.controller";
import { signUpRequest, signInRequest } from "./user.request";

export class UserRoute extends RouteLayer {
  public getRoutes() {
    this.router.get("/", UserController.list);
    this.router.post("/signUp", signUpRequest, UserController.signUp);
    this.router.post(
      "/signIn",
      signInRequest,
      Brute.bruteforce.prevent,
      UserController.signIn
    );
    return this.router;
  }
}

export default UserRoute;
