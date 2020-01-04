import { Request, Response, NextFunction } from "express"

class UserController {
  index(req: Request, res: Response, next: NextFunction) {
    // res.json({ a: 1 });
    //next(new Error("oks"))
    throw new Error('BROKEN')
  }
}

export const UserConroller = new UserController();
