import fs from "fs";
import uuid from "uuid";
import ajv, { ErrorObject } from "ajv";
import ajvError from "ajv-errors";
import { get, has, isArray, isUndefined, keys, unset } from "lodash";
import { generate, GenerateOptions } from "randomstring";
import { hashSync, genSaltSync, compareSync } from "bcryptjs";
import { Schema } from "ajv";
import jwt from "jsonwebtoken";
import escapeHTML from "escape-html";
import { IApp } from "./interface/app.common.interface";
export default class Utils {
  static normaliseErrorMessages(errors: Array<ErrorObject> | null | undefined) {
    if (isArray(errors)) {
      return errors.map((field: ErrorObject) => {
        if (field.instancePath.length && field.instancePath[0] === "/") {
          field.propertyName = field.instancePath.slice(1);
        } else if (has(field, "params.errors[0].params.missingProperty")) {
          field.propertyName = get(
            field,
            "params.errors[0].params.missingProperty"
          );
        }
        unset(field, "params");
        return field;
      });
    }
    return errors;
  }
  // validation
  static async validate(
    schema: Schema,
    data: IApp.IObject<any>
  ): Promise<IApp.IValidate> {
    try {
      const validate = ajvError(
        new ajv({ allErrors: true, $data: true })
      ).compile(schema);
      return {
        isValid: validate(data),
        errors: Utils.normaliseErrorMessages(validate.errors),
      };
    } catch (err) {
      return {
        isValid: false,
        errors: [],
      };
    }
  }

  // convert password to saltsync
  static bcrypt(str: string): string {
    return hashSync(str, genSaltSync(10));
  }

  // compare password with hash
  static compareSync(str: string, hash: string): boolean {
    return compareSync(str, hash);
  }

  // Capitalize a string
  static capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // generate uuid string
  static uuid(): string {
    return uuid.v1();
  }

  static randomString(options: GenerateOptions): string {
    return generate(options);
  }

  // Create sign
  // Expire time 1hours
  static sign(data: IApp.IObject<any>) {
    try {
      const privateKey = fs.readFileSync("private.pem");
      return jwt.sign(data, privateKey, {
        algorithm: "RS256",
        expiresIn: "1h",
      });
    } catch (err) {
      throw err;
    }
  }

  // toke verify
  static verify(token: string) {
    try {
      const privateKey = fs.readFileSync("public.pem");
      return jwt.verify(token, privateKey, { algorithms: ["RS256"] });
    } catch (err) {
      throw err;
    }
  }

  /**
   * Nested loop
   */
  static nestedLoop(obj: IApp.IObject<any>, callback: Function) {
    for (var k in obj) {
      if (typeof obj[k] !== "object") {
        const val = callback(obj[k]);
        if (isUndefined(val)) {
          delete obj[k];
        } else {
          obj[k] = val;
        }
      } else if (!obj[k] || typeof obj[k] === "object") {
        Utils.nestedLoop(obj[k], callback);
      }
    }
  }

  /**
   * sanitize attribute
   */
  static sanitizeAttribute(input: any) {
    let sanitize: any = input;
    sanitize = typeof sanitize === "string" ? escapeHTML(sanitize) : sanitize;
    sanitize = typeof sanitize === "string" ? sanitize.trim() : sanitize;
    sanitize =
      typeof sanitize === "string" && sanitize.length === 0
        ? undefined
        : sanitize;
    return sanitize;
  }
}
