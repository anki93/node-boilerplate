import { Request, Response } from 'express';
// import userService from './user.service';


class UserController {
  async list(req: Request, res: Response) {
    res.status(200).send("OK");
  }
}

export default new UserController();