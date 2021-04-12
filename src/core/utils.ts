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


class Utils {

  // validation
  async validate(schema: Schema, data: IApp.IObject<any>): Promise<IApp.IValidate> {
    const validate = Ajv.compile(schema)
    return {
      isValid: validate(data),
      errors: validate.errors
    }
  };

  // convert password to saltsync
  bcrypt(password: string): string {
    return hashSync(password, genSaltSync(10))
  }

  // compare password with hash
  compareSync(password: string, hash: string): boolean {
    return compareSync(password, hash)
  }

  // Capitalize a string
  capitalize(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  // generate uuid string
  uuid(): string {
    return uuid.v1();
  }

  randomString(options: GenerateOptions): string {
    return generate(options)
  }
}

export const utils = new Utils()
