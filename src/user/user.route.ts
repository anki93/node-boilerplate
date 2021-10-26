import Brute from "../config/brute";
import { RouteLayer } from "../core/interface/routerLayer";
import { InputMiddlewares } from "../core/middlewares";
import { Authenticate } from "../core/middlewares/auth.middlewares";
import UserController from "./user.controller";
import { signUpRequest, signInRequest } from "./user.request";

export class UserRoute extends RouteLayer {
  public getRoutes() {
    this.router.get(
      "/:any",
      // Authenticate.auth,
      // Authenticate.isRole(["USER"]),
      UserController.list
    );
    this.router.post("/signUp",
      InputMiddlewares.validateBody(signUpRequest),
      UserController.signUp);

    this.router.post("/signIn",
      InputMiddlewares.validateBody(signInRequest),
      Brute.bruteforce.prevent,
      UserController.signIn
    );
    return this.router;
  }
}

export default UserRoute;
