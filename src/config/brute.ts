import ExpressBrute from "express-brute";
import MongooseStore from "express-brute-mongoose";
import BruteForceSchema from "express-brute-mongoose/dist/schema";
import moment from "moment";
import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import { tooManyRequests } from "@hapi/boom";

const model = mongoose.model(
  "bruteforce",
  new mongoose.Schema(BruteForceSchema)
);
const store = new MongooseStore(model);

const failCallback = (
  req: Express.Request,
  res: Response,
  next: NextFunction,
  nextValidRequestDate: Date
) => {
  const msg =
    "You've made too many failed attempts in a short period of time, please try again " +
    moment(nextValidRequestDate).fromNow();

  next(tooManyRequests(msg));
};

const handleStoreError = function (error: any) {
  throw {
    message: error.message,
    parent: error.parent,
  };
};

const bruteforce = new ExpressBrute(store, {
  freeRetries: 5,
  minWait: 5 * 60 * 1000, // 5 minutes
  maxWait: 60 * 60 * 1000, // 1 hour,
  failCallback: failCallback,
  handleStoreError: handleStoreError,
});

export default class Brute {
  static bruteforce = bruteforce;
}
