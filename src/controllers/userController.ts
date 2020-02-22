import { Request, Response, NextFunction } from "express"
// import { badData } from "@hapi/boom";
import { userService } from "../services"

class UserController {

  index(req: Request, res: Response, next: NextFunction) {
    userService.user().then((data: number) => {
      res.sendStatus(200).send(data);
    }).catch(next);
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      userService.user().then((data: number) => {
        res.sendStatus(200);
      }).catch(next);      //let data = await userService.signIn(req.body)
      //res.s
    } catch (err) {
      next(err)
    };
  }

  register(req: Request, res: Response, next: NextFunction) {
    userService.register().then(function (err) {
      next(err)
    }).catch(next);
  }

}

export const userController = new UserController();
