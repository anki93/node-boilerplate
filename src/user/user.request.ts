import Utils from "../core/utils";
import { Request, Response, NextFunction } from "express";
import { badRequest } from "@hapi/boom";
import { Constant } from "../core/core.constant";
import { Schema } from "ajv";

export const createRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let userSchema: Schema = {
    type: "object",
    required: ["firstName", "userName", "email", "password"],
    properties: {
      firstName: {
        type: "string",
        minLength: 3,
        maxLength: 15,
        errorMessage: {
          type: "First name must be a string.",
          minLength: "First name must be at least 3 characters.",
        },
      },
      lastName: {
        type: "string",
        minLength: 3,
        maxLength: 15,
        errorMessage: {
          type: "Last name must be a string.",
          minLength: "First name must be at least 3 characters.",
          maxLength: "Last name cannot be longer than 15 characters.",
        },
      },
      userName: {
        type: "string",
        minLength: 3,
        maxLength: 15,
        pattern: "^[A-Za-z0-9-_]+$",
        errorMessage: {
          type: "Username must be a string.",
          pattern: "Username may only have _, -, letters  and numbers.",
          minLength: "Username must be at least 3 characters.",
          maxLength: "Username cannot be longer than 15 characters.",
        },
      },
      email: {
        type: "string",
        minLength: 5,
        maxLength: 50,
        errorMessage: {
          type: "Email must be a string.",
          minLength: "Email must be at least 3 characters.",
          maxLength: "Email cannot be longer than 15 characters.",
        },
      },
      password: {
        type: "string",
        minLength: 3,
        errorMessage: {
          type: "Password must be string.",
          minLength: "Should not be shorter than 3 characters",
        },
      },
    },
    errorMessage: {
      type: "Must be an object",
      required: {
        firstName: "First name is required",
        username: "User name is required",
        email: "Email is required.",
        password: "Password is required.",
      },
    },
  };
  const validate = await Utils.validate(userSchema, req.body);
  next(
    validate.isValid
      ? null
      : badRequest(Constant.error.validation, validate.errors)
  );
};
