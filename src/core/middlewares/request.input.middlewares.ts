import { Request, Response, NextFunction } from "express";
import { Universal } from "../utils/index";
export class RequestInputMiddlewares {
  /**
   *  Sanitize input attributes
   *  */
  static sanitizeInput(req: Request, res: Response, next: NextFunction) {
    Universal.nestedLoop(req.body, Universal.sanitizeAttribute);
    Universal.nestedLoop(req.query, Universal.sanitizeAttribute);
    Universal.nestedLoop(req.params, Universal.sanitizeAttribute);
    next();
  }
}
