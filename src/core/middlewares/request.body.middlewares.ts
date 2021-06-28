import { Request, Response, NextFunction } from "express";
import Utils from "../utils";

export class RequestBodyMiddlewares {
  /**
   * Trim body params
   */
  static trimMiddleware(req: Request, res: Response, next: NextFunction) {
    Utils.trimAttributes(req.body);
    next();
  }

  /**
   * clean body params
   */
  static cleanMiddleware(req: Request, res: Response, next: NextFunction) {
    Utils.clearEmptyAttributes(req.body);
    next();
  }
}
