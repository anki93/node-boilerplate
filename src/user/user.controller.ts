import { NextFunction, Request, Response } from "express";
import { createRequest } from "./user.request";
import { UserSvc } from "./user.service";

class UserController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      // const user = await UserSvc.create(req.body);
      res.status(200).json({
        status: "ok",
        message: "User create successfully!!",
        data: req.body,
      });
    } catch (error) {
      next(error);
    }
  }

  async list(req: Request, res: Response) {
    res.status(200).json("ok");
  }
}

export default new UserController();
