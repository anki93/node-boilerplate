import { Request, Response, NextFunction } from "express"
// import { badData } from "@hapi/boom";

class UserController {
  index(req: Request, res: Response, next: NextFunction) {
    // next("334")
    throw new Error('BROKEN')
  }
}

export const UserConroller = new UserController();
