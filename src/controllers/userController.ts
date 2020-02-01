import { Request, Response, NextFunction } from "express"
// import { badData } from "@hapi/boom";
import { userService } from "../services"

class UserController {
  index(req: Request, res: Response, next: NextFunction) {
    userService.user().then(function (err) {
      next(err)
    }).catch(next);
  }
}

export const UserConroller = new UserController();
