import { Request, Response } from "express";
import { createRequest } from "./user.request";
// import userService from './user.service';

class UserController {
  async list(req: Request, res: Response) {
    res.status(200).json("ok");
  }

  async create(req: Request, res: Response) {
    res.status(200).json({
      status: "ok",
    });
  }
}

export default new UserController();
