import { forbidden, unauthorized } from "@hapi/boom";
import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import { isEmpty, get, includes } from "lodash";
import { Logger } from "../../config";
import { User } from "../../user/user.model";
import { Token } from "../utils/index";
export class Authenticate {
  /**
   * Authencate check
   * @param req
   * @param res
   * @param next
   * @returns
   */
  static async auth(req: Request, res: Response, next: NextFunction) {
    try {
      const token = Authenticate.getToken(req);
      if (isEmpty(token)) {
        return next(unauthorized("Invalid token"));
      }
      const decode = Token.verify(token) as JwtPayload;
      res.locals.user = await User.findByEmailOrUserName(decode.userName);
      return next();
    } catch (err) {
      let error = err as Error;
      Logger.warn(error.message);
      return next(unauthorized("Invalid token"));
    }
  }

  /**
   * determine user role for route
   * @param roles
   * @returns boolean
   */
  static isRole(roles: String[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      const role = get(res.locals.user, "role");
      if (includes(roles, role)) {
        next();
      } else {
        next(forbidden("Permission denied."));
      }
    };
  }

  /**
   * Get token from client input
   * @param param0
   * @returns token
   */
  static getToken({ body, query, headers }: Request) {
    return body.token || query.token || headers["x-access-token"];
  }
}
