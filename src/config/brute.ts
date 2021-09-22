import ExpressBrute from "express-brute";
import MongooseStore from "express-brute-mongoose";
import BruteForceSchema from "express-brute-mongoose/dist/schema";
import moment from "moment";
import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import { tooManyRequests } from "@hapi/boom";

// mongo schema
const model = mongoose.model(
  "bruteforce",
  new mongoose.Schema(BruteForceSchema)
);

// store
const store = new MongooseStore(model);

// fail callback
const failCallback = (
  req: Request,
  res: Response,
  next: NextFunction,
  nextValidRequestDate: Date
) => {
  const msg = "You've made too many failed attempts, please try again later ";

  next(tooManyRequests(msg + moment(nextValidRequestDate).fromNow()));
};

// handle error
const handleStoreError = function (error: any) {
  throw {
    message: error.message,
    parent: error.parent,
  };
};

export default class Brute {
  static bruteforce = new ExpressBrute(store, {
    // freeRetries: 3, // default 3 times
    minWait: 3 * 60 * 1000, // 3 mins
    maxWait: 60 * 60 * 1000, // 1 hour,
    lifetime: 24 * 60 * 60, // session time 24 hours
    attachResetToRequest: true,
    refreshTimeoutOnRequest: true,
    failCallback: failCallback,
    handleStoreError: handleStoreError,
  });
}
