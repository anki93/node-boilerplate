import uuid from "uuid";
import ajv, { ErrorObject } from "ajv";
import ajvError from "ajv-errors";
import _, { get, has, isArray, unset } from "lodash";
import { generate, GenerateOptions } from "randomstring";
import { hashSync, genSaltSync, compareSync } from "bcryptjs";
import { Schema } from "ajv";
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
        new ajv({ allErrors: true, $data: true }),
        {}
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
  static bcrypt(password: string): string {
    return hashSync(password, genSaltSync(10));
  }

  // compare password with hash
  static compareSync(password: string, hash: string): boolean {
    return compareSync(password, hash);
  }

  // Capitalize a string
  static capitalize(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // generate uuid string
  static uuid(): string {
    return uuid.v1();
  }

  static randomString(options: GenerateOptions): string {
    return generate(options);
  }

  // Clear empty attributes
  static clearEmptyAttributes(obj: IApp.IObject<any>) {
    for (var k in obj) {
      if (typeof obj[k] === "string" && obj[k].length === 0) {
        delete obj[k];
      } else if (!obj[k] || typeof obj[k] === "object") {
        Utils.clearEmptyAttributes(obj[k]);
      }
    }
  }

  // trim empty attributes
  static trimAttributes(obj: IApp.IObject<any>) {
    for (var k in obj) {
      if (typeof obj[k] === "string") {
        obj[k] = obj[k].trim();
      } else if (!obj[k] || typeof obj[k] === "object") {
        Utils.clearEmptyAttributes(obj[k]);
      }
    }
  }
}
