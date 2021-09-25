import { NextFunction, Request, Response } from "express";
import { UserSvc } from "./user.service";

class UserController {
  async signUp({ body }: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserSvc.signUp(body);
      res.status(200).json({
        statusCode: 200,
        error: "",
        message: "User sign up successfully!",
        data: user,
      });
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
      res.status(200).json({
        statusCode: 200,
        error: "",
        message: "User sign in successfully!",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async list(req: Request, res: Response) {
    // res.status(200).json({});
  }
}

export default new UserController();
