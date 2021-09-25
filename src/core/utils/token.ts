import fs from "fs";
import jwt from "jsonwebtoken";
import { IApp } from "../interface/app.common.interface";

export class Token {
  /**
   * Create sign
   * Expire time 1hours
   * @param data object
   * @returns string
   */
  static sign(data: IApp.IObject<any>) {
    try {
      const privateKey = fs.readFileSync("private.pem");
      return jwt.sign(data, privateKey, {
        algorithm: "RS256",
        expiresIn: "1h",
      });
    } catch (err) {
      throw err;
    }
  }

  /**
   * toke verify
   * @param token
   * @returns boolean
   */
  static verify(token: string) {
    try {
      const privateKey = fs.readFileSync("public.pem");
      return jwt.verify(token, privateKey, { algorithms: ["RS256"] });
    } catch (err) {
      throw err;
    }
  }
}
