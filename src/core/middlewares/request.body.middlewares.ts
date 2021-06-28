import { Request, Response, NextFunction } from 'express'
import Utils from "../utils";

export class RequestBodyMiddlewares {
  /** 
   * Trim attribute
  */
  static trimAttributeMiddleware(req: Request, res: Response, next: NextFunction) {
    Utils.trimAttributes(req.body);
    next();
  }

  /**
  * Clear Empty attributes middlerware
  */
  static clearEmptyAttributesMiddleware(req: Request, res: Response, next: NextFunction) {
    Utils.clearEmptyAttributes(req.body);
    next();
  }
}
