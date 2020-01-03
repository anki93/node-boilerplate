import { Request, Response, NextFunction } from "express"

class UserController {
  index(req: Request, res: Response, next: NextFunction) {
    //res.json({ a: 1 });
    next("okkkk")
  }
}

export const UserConroller = new UserController();
