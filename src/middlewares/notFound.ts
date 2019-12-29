import { Request, Response, NextFunction } from 'express'
import { notFound } from '@hapi/boom'

/**
 * Catch 404 and forward to error handler
 * @public
 */
export default (req: Request, res: Response, next: NextFunction) => {
  next(notFound())
}
