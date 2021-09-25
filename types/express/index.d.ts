import { Payload } from "@hapi/boom";
import { Request, Response } from "express";
interface Json {
  (data: Payload): Response;
}
declare module "express" {
  interface Response {
    json: Json;
  }
}
