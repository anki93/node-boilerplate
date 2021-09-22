import crypto from "crypto";
import fs from "fs";

const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: "spki",
    format: "pem",
  },
  privateKeyEncoding: {
    type: "pkcs8",
    format: "pem",
  },
});

try {
  fs.writeFileSync(`../privateKey.pem`, privateKey);
  fs.writeFileSync(`../publicKey.pem`, publicKey);
} catch (error) {
  console.error(error);
}
