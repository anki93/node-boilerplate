import { Request, Response, NextFunction } from "express";
import Utils from "../utils";

export class RequestInputMiddlewares {
  /**
   *  Sanitize input attributes
   *  */
  static sanitizeInput(req: Request, res: Response, next: NextFunction) {
    Utils.nestedLoop(req.body, Utils.sanitizeAttribute);
    Utils.nestedLoop(req.query, Utils.sanitizeAttribute);
    Utils.nestedLoop(req.params, Utils.sanitizeAttribute);
    next();
  }
}
