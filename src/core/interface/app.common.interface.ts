import { ErrorObject } from "ajv";
import { JwtPayload } from "jsonwebtoken";

export namespace IApp {
  export interface IObject<T> {
    [key: string]: T;
  }

  export interface IValidate {
    isValid: Boolean;
    errors: Array<ErrorObject> | null | undefined;
  }
}
