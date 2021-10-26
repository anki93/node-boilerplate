import { NextFunction, Request, Response } from "express";
import { UserSvc } from "./user.service";
import { Handle } from "../core/utils/index";

class UserController {
  async signUp({ body }: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserSvc.signUp(body);
      Handle.created(res, "User sign up successfully!", user);
    } catch (error) {
      next(error);
    }
  }

  async signIn({ body, brute }: Request, res: Response, next: NextFunction) {
    try {
      const data = await UserSvc.signIn(body);
      if (data && brute && brute.reset) {
        brute.reset();
      }
      Handle.ok(res, "User sign in successfully!", data);
    } catch (error) {
      next(error);
    }
  }

  async list(req: Request, res: Response) {
    // res.status(200).json({});
    Handle.ok(res, "Succcess", { name: Math.ceil((Math.random() * 100)) })
  }
}

export default new UserController();
