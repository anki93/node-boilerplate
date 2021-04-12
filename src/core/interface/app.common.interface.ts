import { ErrorObject } from "ajv";

export namespace IApp {
  export interface IObject<T> {
    [key: string]: T
  }

  export interface IValidate {
    isValid: Boolean;
    errors: Array<ErrorObject> | null | undefined
  }
}
