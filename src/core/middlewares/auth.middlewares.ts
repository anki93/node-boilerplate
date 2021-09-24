import fs from "fs";
import { unauthorized } from "@hapi/boom";
import { Request, Response, NextFunction } from "express";
import { isEmpty } from "lodash";
import Utils from "../utils";

export class Authenticate {
  static auth(req: Request, res: Response, next: NextFunction) {
    try {
      const token = Authenticate.getToken(req);
      if (isEmpty(token)) {
        return next(unauthorized("Invalid token"));
      }
      res.locals.user = Utils.verify(token);
      return next();
    } catch (err) {
      let error = err as Error;
      return next(unauthorized(error.message));
    }
  }

  static getToken({ body, query, headers }: Request) {
    return body.token || query.token || headers["x-access-token"];
  }
}
