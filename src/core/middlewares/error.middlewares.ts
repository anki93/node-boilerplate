import { Request, Response, NextFunction } from "express";
import { notFound, Payload } from "@hapi/boom";
import { Boom } from "@hapi/boom";
import { Logger, CONSTANT } from "../../config";
import { MongoError } from "mongodb";
import { capitalize, lowerCase } from "lodash";

// handle unhandled Rejection
process.on("unhandledRejection", (reason: any) => {
  Logger.error(`Unhandled Rejection at: ${reason}`);
});

// handle uncaught exception
process.on("uncaughtException", (err: Error) => {
  Logger.error(`UnCaughtException - ${err.message}`, err.stack);
});

export class ErrorMiddleware {
  /**
   * Catch 404 and forward to error handler
   */
  static notFound(req: Request, res: Response, next: NextFunction) {
    next(notFound());
  }

  /**
   * optimize error and logs error
   * handle error logs
   * */
  static optimizeErrorResponse(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    next(err);
  }

  /**
   * Response return to client
   * */
  static errorResponseHandler(
    err: Boom | Error,
    req: Request,
    res: Response,
    next: Function
  ) {
    if (err instanceof Boom) {
      const obj: Payload = err.output.payload;
      obj.data = err.data;
      res.status(err.output.statusCode).json(obj);
    } else if (err instanceof MongoError) {
      res.status(500).json(ErrorMiddleware.handleMongoError(err));
    } else {
      const obj: Payload = {
        statusCode: 500,
        data: null,
        error:
          process.env.DEBUG === "true"
            ? err instanceof Error
              ? err.message
              : err
            : "",
        message: CONSTANT.ERROR.MESSAGE,
        stack: process.env.DEBUG === "true" ? err.stack : undefined,
      };
      res.status(500).json(obj);
    }
  }

  static handleMongoError(err: MongoError) {
    const obj: Payload = {
      statusCode: 409,
      data: null,
      error:
        process.env.DEBUG === "true"
          ? err instanceof Error
            ? err.message
            : err
          : "",
      message: "",
      stack: process.env.DEBUG === "true" ? err.stack : undefined,
    };

    if (err.code === 11000) {
      const field = err.message
        .split("index: ")[1]
        .split("dup key")[0]
        .split("_")[0];
      obj.message = `${capitalize(lowerCase(field))} already exists.`;
    }
    return obj;
  }
}
