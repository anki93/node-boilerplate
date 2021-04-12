import { utils } from "../core/utils";
import { Request, Response, NextFunction } from "express";
import { badRequest } from "@hapi/boom";
import { Constant } from "../core/core.constant";
import { Schema } from "ajv";

export const createRequest = async (req: Request, res: Response, next: NextFunction) => {
  let userSchema: Schema = {
    type: "object",
    required: [
      "userOrEmail", "password"
    ],
    properties: {
      userOrEmail: {
        type: "string",
        minLength: 3,
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
        userOrEmail: "Username/Email is required.",
        password: "Password is required."
      }
    }
  }

  const validate = await utils.validate(userSchema, req.body);
  next(validate.isValid ? null : badRequest(Constant.error.validation, validate.errors))
}
