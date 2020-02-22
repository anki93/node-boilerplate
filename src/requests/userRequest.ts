import { helper } from "../utils"
import { Request, Response, NextFunction } from "express";
import { badRequest } from "@hapi/boom";
import { CONSTANT } from "../config";

export const validateLoginRequest = (req: Request, res: Response, next: NextFunction) => {
  let userSchema = {
    type: 'object',
    required: [
      'username', 'password'
    ],
    emUsed: false,
    properties: {
      username: {
        type: 'string',
        errorMessage: {
          type: "Username is required.",
        }
      },
      password: {
        type: 'string',
        minLength: 3,
        errorMessage: {
          type: "Password field is requied.",
          minLength: "Should not be shorter than 3 characters",
        }
      }
    },
    errorMessage: {
      type: "Must be an object",
      required: {
        username: "Username field is required.",
        password: "Password field is required."
      }
    }
  }
  let validate = helper.ajv.compile(userSchema);
  if (validate(req.body)) {
    next()
  } else {
    next(
      badRequest(CONSTANT.ERROR.VALIDATION, validate.errors)
    );
  }
}
