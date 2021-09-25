import { hashSync, genSaltSync, compareSync } from "bcryptjs";

export class Password {
  // convert password to saltsync
  static decode(str: string): string {
    return hashSync(str, genSaltSync(10));
  }

  // compare password with hash
  static verify(str: string, hash: string): boolean {
    return compareSync(str, hash);
  }
}
