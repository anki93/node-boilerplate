import { JwtPayload } from "jsonwebtoken";
declare module "jsonwebtoken" {
  interface JwtPayload {
    _id: string;
    userName: string;
  }
}
