import { Request, Response, NextFunction } from "express"
// import { badData } from "@hapi/boom";
import { userService } from "../services"
import { userRequest } from "../requests";

class UserController {

  index(req: Request, res: Response, next: NextFunction) {
    userService.user().then((data: number) => {
      res.send(data);
    }).catch(next);
  }

  async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      userRequest.login(req.body)
      //await userService.signIn()
    } catch (err) {
      console.log(err);
      next(err)
    };
  }

  signUp(req: Request, res: Response, next: NextFunction) {
    userService.signUp().then(function (err) {
      next(err)
    }).catch(next);
  }

}

export const UserConroller = new UserController();
