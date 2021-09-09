import xss from "xss";
import { IApp } from "./interface/app.common.interface";

export default class Security {
  // Clear empty attributes
  static clearEmptyAttributes(obj: IApp.IObject<any>) {
    for (var k in obj) {
      if (typeof obj[k] === "string" && obj[k].length === 0) {
        delete obj[k];
      } else if (!obj[k] || typeof obj[k] === "object") {
        Security.clearEmptyAttributes(obj[k]);
      }
    }
  }

  // trim empty attributes
  static trimAttributes(obj: IApp.IObject<any>) {
    for (var k in obj) {
      if (typeof obj[k] === "string") {
        obj[k] = obj[k].trim();
      } else if (!obj[k] || typeof obj[k] === "object") {
        Security.clearEmptyAttributes(obj[k]);
      }
    }
  }

  // Sanitize untrusted HTML
  static xss(obj: IApp.IObject<any>) {
    for (var k in obj) {
      if (typeof obj[k] === "string") {
        obj[k] = xss(obj[k]);
      } else if (!obj[k] || typeof obj[k] === "object") {
        Security.xss(obj[k]);
      }
    }
  }
}
