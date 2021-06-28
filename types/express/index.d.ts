import { Payload } from "@hapi/boom";

declare namespace Express {
  export interface Request {}

  export interface Response {
    // flush: Function
    json: Function<Payload>;
  }
}
