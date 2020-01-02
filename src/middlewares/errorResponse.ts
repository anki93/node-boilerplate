import { Request, Response, NextFunction } from 'express'
import { Boom } from '@hapi/boom'
import { logger } from '../config'

/**
 * Catch 404 and forward to error handler
 * @public
 */
export default (err: Boom | Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Boom) {
    res.status(err.output.statusCode).json(err.output.payload);
  } else {
    res.status(500).json({
      statusCode: 500,
      error: err.message,
      message: "Sorry, something went wrong there. Try again."
    })
  }
}

// handle unhandled Rejection
process.on('unhandledRejection', (event, p) => {
  // logger.log({
  //   level: 'error',
  //   message: event.reason
  // });
})

// handle uncaught exception
process.on('uncaughtException', (err: Error) => {
  logger.log({
    level: 'error',
    message: err.message,
    stack: err.stack
  });
})
