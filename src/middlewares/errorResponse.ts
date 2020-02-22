import { Request, Response, NextFunction } from 'express'
import { Boom } from '@hapi/boom'
import { LOGGER, CONSTANT } from '../config'

export default (err: Boom | Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Boom) {
    res.status(err.output.statusCode).json({
      ...err.output.payload,
      data: err.data
    });
  } else {

    let extra: any = {}

    // passing extra params for debugging.
    if (process.env.DEBUG === 'true') {
      extra.stack = err.stack;
    }

    res.status(500).json({
      statusCode: 500,
      error: err instanceof Error ? err.message : err,
      message: CONSTANT.ERROR.MESSAGE,
      data: null,
      ...extra
    })
  }
}

// handle unhandled Rejection
process.on('unhandledRejection', (event, p) => {
  // LOGGER.log({
  //   level: 'error',
  //   message: event.reason
  // });
})

// handle uncaught exception
process.on('uncaughtException', (err: Error) => {
  LOGGER.log({
    level: 'error',
    message: err.message,
    stack: err.stack
  });
})
