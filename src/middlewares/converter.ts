import { Request, Response, NextFunction } from "express";
import { badRequest } from "@hapi/boom";
import { ValidateFunction } from "ajv";

export default (err: Error | ValidateFunction, req: Request, res: Response, next: NextFunction) => {
  if ("errors" in err) {
    next(badRequest("Validation", err.errors))
  } else {
    next(err)
  }
}
