import { Request, Response, NextFunction } from "express";
import Security from "../security";

export class RequestBodyMiddlewares {
  /**
   *  Sanitize untrusted HTML
   *  */
  static sanitizeInput(req: Request, res: Response, next: NextFunction) {
    Security.xss(req.query);
    Security.xss(req.body);
    next();
  }

  /**
   * Trim body params
   */
  static trimMiddleware(req: Request, res: Response, next: NextFunction) {
    Security.trimAttributes(req.body);
    Security.trimAttributes(req.query);
    next();
  }

  /**
   * clean body params
   */
  static cleanMiddleware(req: Request, res: Response, next: NextFunction) {
    Security.clearEmptyAttributes(req.body);
    Security.clearEmptyAttributes(req.query);
    next();
  }
}
