import { Request, Response, NextFunction } from 'express'
import { Boom } from '@hapi/boom'
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
process.on('unhandledRejection', (err, p) => {
  console.log(err)
})

// handle uncaught exception
process.on('uncaughtException', (err) => {
  console.log(err)
})
