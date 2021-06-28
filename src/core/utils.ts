import uuid from "uuid";
import ajv from "ajv";
import ajvError from "ajv-errors";
import _ from "lodash";
import { generate, GenerateOptions } from "randomstring";
import { hashSync, genSaltSync, compareSync } from "bcryptjs";
import { Schema } from "ajv";
import { IApp } from "./interface/app.common.interface";

const Ajv = new ajv({ allErrors: true, $data: true })
ajvError(Ajv, {  })


export default class Utils {

  // validation
  static async validate(schema: Schema, data: IApp.IObject<any>): Promise<IApp.IValidate> {
    const validate = Ajv.compile(schema)
    return {
      isValid: validate(data),
      errors: validate.errors
    }
  };

  // convert password to saltsync
  static bcrypt(password: string): string {
    return hashSync(password, genSaltSync(10))
  }

  // compare password with hash
  static compareSync(password: string, hash: string): boolean {
    return compareSync(password, hash)
  }

  // Capitalize a string
  static capitalize(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  // generate uuid string
  static uuid(): string {
    return uuid.v1();
  }

  static randomString(options: GenerateOptions): string {
    return generate(options)
  }

  // Clear empty attributes
  static clearEmptyAttributes(obj: IApp.IObject<any>) {
    for (var k in obj) {
      if(typeof obj[k] === "string" && obj[k].length === 0) {
        delete obj[k];
      } else if(!obj[k] || typeof obj[k] === "object") {
        Utils.clearEmptyAttributes(obj[k]);
      }
    }
  }

  // trim empty attributes
  static trimAttributes(obj: IApp.IObject<any>) {
    for (var k in obj) {
      if(typeof obj[k] === "string") {
        obj[k] = obj[k].trim();
      } else if(!obj[k] || typeof obj[k] === "object") {
        Utils.clearEmptyAttributes(obj[k])
      }
    }
  }
}
