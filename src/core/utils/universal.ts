import uuid from "uuid";
import ajv, { ErrorObject } from "ajv";
import ajvError from "ajv-errors";
import { get, has, isArray, isUndefined, unset } from "lodash";
import { generate, GenerateOptions } from "randomstring";
import { Schema } from "ajv";
import escapeHTML from "escape-html";
import { IApp } from "../interface/app.common.interface";

export class Universal {
  static normaliseErrorMessages(errors: Array<ErrorObject> | null | undefined) {
    if (isArray(errors)) {
      return errors.map((field: ErrorObject) => {
        const error: any = {}
        if (field.instancePath.length && field.instancePath[0] === "/") {
          error.attribute = field.instancePath.slice(1);
        } else if (has(field, "params.errors[0].params.missingProperty")) {
          error.attribute = get(
            field,
            "params.errors[0].params.missingProperty"
          );
        }
        error.message = field.message;
        // unset(field, "params");
        return error;
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

      const isValid = validate(data)
      console.log(validate.errors, "validate.errors")
      return {
        isValid,
        errors: Universal.normaliseErrorMessages(validate.errors),
      };
    } catch (err) {
      return {
        isValid: false,
        errors: [],
      };
    }
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
        Universal.nestedLoop(obj[k], callback);
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
