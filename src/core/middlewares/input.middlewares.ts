import { Request, Response, NextFunction } from "express";
import multer from "multer";
import { Universal } from "../utils/index";
export class InputMiddlewares {
  /**
   *  Sanitize input attributes
   *  */
  static sanitizeInput(req: Request, res: Response, next: NextFunction) {
    Universal.nestedLoop(req.body, Universal.sanitizeAttribute);
    Universal.nestedLoop(req.query, Universal.sanitizeAttribute);
    Universal.nestedLoop(req.params, Universal.sanitizeAttribute);
    next();
  }

  static fileHandler(type: string): multer.Multer {
    return multer({ dest: `uploads/${type}/` });
  }
}
