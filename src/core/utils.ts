import uuid from "uuid";
import ajv from "ajv";
import ajvError from "ajv-errors";
import _ from "lodash";
import { generate, GenerateOptions } from "randomstring";
import { hashSync, genSaltSync, compareSync } from "bcryptjs";

const Ajv = new ajv({ allErrors: true, $data: true })
ajvError(Ajv, { keepErrors: false })


class Utils {

  // validation
  ajv = Ajv;

  // convert password to saltsync
  bcrypt(password: string) {
    return hashSync(password, genSaltSync(10))
  }

  // compare password with hash
  compareSync(password: string, hash: string) {
    return compareSync(password, hash)
  }

  // Capitalize a string
  capitalize(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  // generate uuid string
  uuid() {
    return uuid.v1();
  }

  randomString(options: GenerateOptions) {
    return generate(options)
  }
}

export const utils = new Utils()
