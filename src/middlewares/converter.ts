import { Request, Response, NextFunction } from "express";
import { badRequest } from "@hapi/boom";
import { ValidateFunction } from "ajv";
import { CONSTANT } from "../config";

export default (err: Error | ValidateFunction, req: Request, res: Response, next: NextFunction) => {
  if ("errors" in err) {
    next(badRequest(CONSTANT.ERROR.VALIDATION, err.errors))
  } else {
    next(err)
  }
}
