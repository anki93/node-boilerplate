import { utils } from "../core/utils";
import { Request, Response, NextFunction } from "express";
import { badRequest } from "@hapi/boom";
import { Constant } from "./user.constant";

export const validate = (req: Request, res: Response, next: NextFunction) => {
  let userSchema = {
    type: "object",
    required: [
      "userOrEmail", "password"
    ],
    emUsed: false,
    properties: {
      username: {
        type: "string",
        errorMessage: {
          type: "Username/Email is required.",
        }
      },
      password: {
        type: "string",
        minLength: 3,
        errorMessage: {
          type: "Password is requied.",
          minLength: "Should not be shorter than 3 characters",
        }
      }
    },
    errorMessage: {
      type: "Must be an object",
      required: {
        username: "Username/Email is required.",
        password: "Password is required."
      }
    }
  }
  const validate = utils.ajv.compile(userSchema);
  if (validate(req.body)) {
    next()
  } else {
    next(
      badRequest(Constant.error.message, validate.errors)
    );
  }
}
